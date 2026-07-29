import crypto from "crypto";
import Team from "@/lib/models/Team";
import User from "@/lib/models/User";
import JoinRequest from "@/lib/models/JoinRequest";
import Invitation from "@/lib/models/Invitation";
import CollegeRequest from "@/lib/models/CollegeRequest";
import { GAMES } from "@/lib/constants/games";

// HELPER: Generate Invite Code
const generateInviteCode = () => crypto.randomBytes(3).toString("hex").toUpperCase();

// ==========================================
// TEAM CREATION & DELETION
// ==========================================

export const createTeam = async ({ userId, name, game }) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");
  if (user.teamId) throw new Error("You are already in a team");
  if (user.game !== game) throw new Error("You can only create a team for your selected game.");

  // Check if college is approved
  const { COLLEGE_DOMAIN_MAP } = await import("@/lib/collegeMap");
  const userCollege = (user.college || "").trim();
  const staticCollegesLower = Object.keys(COLLEGE_DOMAIN_MAP).map(c => c.toLowerCase());
  const isStaticCollege = userCollege && staticCollegesLower.includes(userCollege.toLowerCase());
  
  if (!isStaticCollege) {
    // Try exact match first, then case-insensitive
    const collegeReq = await CollegeRequest.findOne({ 
      college_name: userCollege, 
      status: "Approved" 
    }) || await CollegeRequest.findOne({ 
      college_name: { $regex: new RegExp('^' + userCollege.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') }, 
      status: "Approved" 
    });
    
    if (!collegeReq) {
      console.error("[createTeam] College not found. user.college:", JSON.stringify(userCollege), "| COLLEGE_DOMAIN_MAP keys:", Object.keys(COLLEGE_DOMAIN_MAP));
      throw new Error(`UNREGISTERED_COLLEGE: Your college '${userCollege}' is not recognized. Recognized static: ${staticCollegesLower.join(", ")}`);
    }
  }

  const gameConfig = GAMES[game];
  if (!gameConfig) throw new Error("Invalid game.");

  // Check if user is already a leader of another team (just in case)
  const existingTeam = await Team.findOne({ leaderId: userId });
  if (existingTeam) throw new Error("You already lead a team.");

  const team = await Team.create({
    name,
    game,
    college: user.college,
    leaderId: userId,
    maxPlayers: gameConfig.maxPlayers,
    inviteCode: generateInviteCode(),
    members: [{ userId, role: "LEADER" }],
  });

  user.teamId = team._id;
  if (user.role !== "ADMIN") user.role = "LEADER";
  await user.save();

  return team;
};

export const deleteTeam = async (leaderId) => {
  const team = await Team.findOne({ leaderId });

  if (!team) throw new Error("You are not leading any team");

  // Reset all members
  // Reset non-admin members to PLAYER, keep ADMIN role
  const memberIds = team.members.map((m) => m.userId);
  await User.updateMany(
    { _id: { $in: memberIds }, role: { $ne: "ADMIN" } },
    { $set: { teamId: null, role: "PLAYER" } }
  );
  await User.updateMany(
    { _id: { $in: memberIds }, role: "ADMIN" },
    { $set: { teamId: null } }
  );

  // Cascade delete requests and invitations
  await JoinRequest.deleteMany({ teamId: team._id });
  await Invitation.deleteMany({ teamId: team._id });

  // Delete team
  await Team.deleteOne({ _id: team._id });

  return { message: "Team deleted successfully" };
};

// ==========================================
// REGISTRATION (LOCK)
// ==========================================

export const registerTeam = async (leaderId) => {
  const team = await Team.findOne({ leaderId });

  if (!team) throw new Error("You are not leading any team");
  if (team.isRegistered) throw new Error("Team is already registered.");

  // Validate team size (optional based on your rules, e.g., must be full to register)
  // if (team.members.length < team.maxPlayers) throw new Error("Team must be full to register");

  team.isRegistered = true;
  await team.save();

  // Expire all pending join requests and invitations
  await JoinRequest.updateMany({ teamId: team._id, status: "PENDING" }, { status: "REJECTED" });
  await Invitation.updateMany({ teamId: team._id, status: "PENDING" }, { status: "EXPIRED" });

  return { message: "Team locked and registered for tournament successfully" };
};


// ==========================================
// INVITATIONS (Leader -> Player)
// ==========================================

export const inviteMember = async (leaderId, inviteeEmail) => {
  const team = await Team.findOne({ leaderId });

  if (!team) throw new Error("You are not leading any team");
  if (team.isRegistered) throw new Error("Cannot invite members to a registered team.");
  if (team.members.length >= team.maxPlayers + 1) throw new Error("Team is full.");

  const invitee = await User.findOne({
    $or: [
      { email: { $regex: new RegExp(`^${inviteeEmail}$`, "i") } },
      { collegeEmail: { $regex: new RegExp(`^${inviteeEmail}$`, "i") } }
    ]
  });
  if (!invitee) throw new Error("No user found with that email address.");

  if (invitee.college !== team.college) throw new Error("Invitee belongs to a different college.");
  if (invitee.game !== team.game) throw new Error(`Invitee has selected a different game (${invitee.game}).`);
  if (invitee.teamId) throw new Error("Invitee is already in a team.");

  // Check if already invited
  const existingInvite = await Invitation.findOne({ teamId: team._id, inviteeEmail, status: "PENDING" });
  if (existingInvite) throw new Error("An invitation is already pending for this user.");

  const invitation = await Invitation.create({
    teamId: team._id,
    inviterId: leaderId,
    inviteeEmail,
  });

  return { message: "Invitation sent successfully", invitation };
};

export const respondToInvitation = async (userId, invitationId, accept) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const invitation = await Invitation.findById(invitationId).populate("teamId");
  if (!invitation) throw new Error("Invitation not found");
  if (invitation.inviteeEmail !== user.email) throw new Error("Unauthorized to respond to this invitation");
  if (invitation.status !== "PENDING") throw new Error("This invitation is no longer pending");

  const team = invitation.teamId;

  if (!accept) {
    invitation.status = "DECLINED";
    await invitation.save();
    return { message: "Invitation declined" };
  }

  // Accepting the invitation
  if (team.isRegistered) throw new Error("Team registration is already locked.");
  if (user.teamId) {
    invitation.status = "DECLINED";
    await invitation.save();
    throw new Error("You are already in a team.");
  }
  if (team.members.length >= team.maxPlayers + 1) {
    invitation.status = "EXPIRED";
    await invitation.save();
    throw new Error("Team is already full.");
  }

  // Add player
  team.members.push({ userId: user._id, role: "MEMBER" });
  await team.save();

  user.teamId = team._id;
  if (user.role !== "ADMIN") user.role = "PLAYER";
  await user.save();

  invitation.status = "ACCEPTED";
  await invitation.save();

  // Expire all other pending invites for this user since they joined a team
  await Invitation.updateMany({ inviteeEmail: user.email, status: "PENDING" }, { status: "EXPIRED" });
  await JoinRequest.updateMany({ userId: user._id, status: "PENDING" }, { status: "REJECTED" });

  return { message: "Joined team successfully" };
};

export const getInvitations = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const escapedEmail = user.email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedCollegeEmail = user.collegeEmail ? user.collegeEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : escapedEmail;

  const invitations = await Invitation.find({
    inviteeEmail: { $regex: new RegExp(`^(${escapedEmail}|${escapedCollegeEmail})$`, "i") },
    status: "PENDING"
  })
    .populate("teamId", "name game college isRegistered")
    .populate("inviterId", "name");

  return invitations;
};

export const getSentInvitations = async (leaderId) => {
  const team = await Team.findOne({ leaderId });
  if (!team) throw new Error("Not leading a team");

  return await Invitation.find({ teamId: team._id }).sort({ createdAt: -1 });
};


// ==========================================
// JOIN REQUESTS (Player -> Leader)
// ==========================================

export const requestJoinTeam = async (userId, teamId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.teamId) throw new Error("You are already part of a team.");

  const team = await Team.findById(teamId);
  if (!team) throw new Error("Team not found.");
  if (team.isRegistered) throw new Error("Team registration is locked.");
  if (user.college !== team.college) throw new Error("You can only join teams from your own college.");
  if (user.game !== team.game) throw new Error("You can only join teams of your selected game.");
  if (team.members.length >= team.maxPlayers + 1) throw new Error("Team is full.");

  const existingRequest = await JoinRequest.findOne({ userId, teamId });
  if (existingRequest) throw new Error("You have already requested to join this team.");

  const request = await JoinRequest.create({ userId, teamId });
  return { message: "Join request sent successfully.", request };
};

export const acceptJoinRequest = async (leaderId, requestId) => {
  const team = await Team.findOne({ leaderId });
  if (!team) throw new Error("You are not leading any team.");
  if (team.isRegistered) throw new Error("Team registration is locked.");

  const request = await JoinRequest.findById(requestId);
  if (!request) throw new Error("Join request not found.");
  if (request.teamId.toString() !== team._id.toString()) throw new Error("This request does not belong to your team.");

  const player = await User.findById(request.userId);
  if (!player) throw new Error("Player not found.");

  if (player.teamId) {
    await JoinRequest.findByIdAndDelete(requestId);
    throw new Error("Player has already joined another team.");
  }
  if (player.college !== team.college) throw new Error("Player belongs to a different college.");
  if (player.game !== team.game) throw new Error("Player has selected a different game.");
  if (team.members.length >= team.maxPlayers + 1) throw new Error("Team is already full.");

  team.members.push({ userId: player._id, role: "MEMBER" });
  await team.save();

  player.teamId = team._id;
  if (player.role !== "ADMIN") player.role = "PLAYER";
  await player.save();

  await JoinRequest.findByIdAndDelete(requestId);

  // Expire other requests/invites for this player
  await Invitation.updateMany({ inviteeEmail: player.email, status: "PENDING" }, { status: "EXPIRED" });
  await JoinRequest.updateMany({ userId: player._id, status: "PENDING" }, { status: "REJECTED" });

  return { message: "Player added to the team successfully." };
};

export const getPendingRequests = async (leaderId) => {
  const team = await Team.findOne({ leaderId });
  if (!team) throw new Error("You are not leading any team.");
  return await JoinRequest.find({ teamId: team._id, status: "PENDING" }).populate("userId", "name email");
};


// ==========================================
// JOIN VIA CODE
// ==========================================

export const joinWithCode = async (userId, inviteCode) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (user.teamId) throw new Error("You are already part of a team.");

  const team = await Team.findOne({ inviteCode: inviteCode.toUpperCase() });
  if (!team) throw new Error("Invalid invite code.");
  if (team.isRegistered) throw new Error("Team registration is locked.");
  if (user.college !== team.college) throw new Error("You can only join teams from your own college.");
  if (user.game !== team.game) throw new Error(`Team is playing ${team.game}, but you selected ${user.game}.`);
  if (team.members.length >= team.maxPlayers + 1) throw new Error("Team is already full.");

  team.members.push({ userId: user._id, role: "MEMBER" });
  await team.save();

  user.teamId = team._id;
  if (user.role !== "ADMIN") user.role = "PLAYER";
  await user.save();

  // Expire pending invites/requests for this user
  await Invitation.updateMany({ inviteeEmail: user.email, status: "PENDING" }, { status: "EXPIRED" });
  await JoinRequest.updateMany({ userId: user._id, status: "PENDING" }, { status: "REJECTED" });

  return { message: "Joined team successfully via invite code.", team };
};


// ==========================================
// LEAVE & REMOVE MEMBERS
// ==========================================

export const leaveTeam = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (!user.teamId) throw new Error("You are not part of any team");

  const team = await Team.findById(user.teamId);
  if (!team) throw new Error("Team not found");
  
  if (team.leaderId.toString() === userId.toString()) {
    throw new Error("You are the team leader. Delete the team before leaving.");
  }
  
  if (team.isRegistered) throw new Error("Team registration is locked. You cannot leave the team.");

  team.members = team.members.filter((member) => member.userId.toString() !== userId.toString());
  await team.save();

  user.teamId = null;
  if (user.role !== "ADMIN") user.role = "PLAYER";
  await user.save();

  return { message: "Left team successfully" };
};

export const removeMember = async (leaderId, memberId) => {
  const team = await Team.findOne({ leaderId });
  if (!team) throw new Error("You are not leading any team");
  if (team.isRegistered) throw new Error("Team registration is locked. You cannot remove members.");
  
  if (leaderId.toString() === memberId.toString()) {
    throw new Error("You cannot remove yourself. Delete the team instead.");
  }

  const member = await User.findById(memberId);
  if (!member) throw new Error("Member not found");

  if (!member.teamId || member.teamId.toString() !== team._id.toString()) {
    throw new Error("Player is not a member of your team");
  }

  team.members = team.members.filter((m) => m.userId.toString() !== memberId.toString());
  await team.save();

  member.teamId = null;
  if (member.role !== "ADMIN") member.role = "PLAYER";
  await member.save();

  return { message: "Member removed successfully" };
};


// ==========================================
// GET TEAM DATA
// ==========================================

export const getCurrentTeam = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (!user.teamId) throw new Error("You are not in any team");

  const team = await Team.findById(user.teamId)
    .populate("leaderId", "name email collegeEmail college game")
    .populate("members.userId", "name email collegeEmail role college game");

  if (!team) throw new Error("Team not found");
  return team;
};