import Team from "@/lib/models/Team";
import User from "@/lib/models/User";
import JoinRequest from "@/lib/models/JoinRequest";

// CREATE TEAM
export const createTeam = async ({ userId, name, game }) => {
  const user = await User.findById(userId);

  if (user.teamId) throw new Error("Already in a team");

  const limits = {
    BGMI: 4,
    FREEFIRE: 4,
    VALORANT: 5
  };

  const team = await Team.create({
    name,
    game,
    leaderId: userId,
    maxPlayers: limits[game],
    members: [{ userId, role: "MEMBER" }]
  });

  user.teamId = team._id;
  user.role = "LEADER";
  await user.save();

  return team;
};

// REQUEST TO JOIN TEAM
export const requestJoinTeam = async (userId, teamId) => {

    // User
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    // Already in a team
    if (user.teamId) {
        throw new Error("You are already part of a team.");
    }

    // Team
    const team = await Team.findById(teamId);

    if (!team) {
        throw new Error("Team not found.");
    }

    // Same game check
    if (user.game !== team.game) {
        throw new Error("You can only join teams of your selected game.");
    }

    // Team full
    if (team.members.length >= team.maxPlayers + 1) {
        throw new Error("Team is full.");
    }

    // Duplicate request
    const existingRequest = await JoinRequest.findOne({
        userId,
        teamId,
    });

    if (existingRequest) {
        throw new Error("You have already requested to join this team.");
    }

    // Create request
    const request = await JoinRequest.create({
        userId,
        teamId,
    });

    return {
        message: "Join request sent successfully.",
        request,
    };
};

//ACCEPT JOIN REQUEST 
export const acceptJoinRequest = async (leaderId, requestId) => {

    // Find leader's team
    const team = await Team.findOne({ leaderId });

    if (!team) {
        throw new Error("You are not leading any team.");
    }

    // Find request
    const request = await JoinRequest.findById(requestId);

    if (!request) {
        throw new Error("Join request not found.");
    }

    // Ensure request belongs to this team
    if (request.teamId.toString() !== team._id.toString()) {
        throw new Error("This request does not belong to your team.");
    }

    // Find player
    const player = await User.findById(request.userId);

    if (!player) {
        throw new Error("Player not found.");
    }

    // Already joined another team?
    if (player.teamId) {
        await JoinRequest.findByIdAndDelete(requestId);
        throw new Error("Player has already joined another team.");
    }

    // Extra safety
    if (player.game !== team.game) {
        throw new Error("Player has selected a different game.");
    }

    // Team full?
    if (team.members.length >= team.maxPlayers + 1) {
        throw new Error("Team is already full.");
    }

    // Add player
    team.members.push({
        userId: player._id,
        role: "PLAYER"
    });

    await team.save();

    // Update player
    player.teamId = team._id;
    player.role = "PLAYER";

    await player.save();

    // Delete request
    await JoinRequest.findByIdAndDelete(requestId);

    return {
        message: "Player added to the team successfully."
    };
};

//REMOVE MEMBER
export const removeMember = async (leaderId, memberId) => {

    // Find leader's team
    const team = await Team.findOne({ leaderId });

    if (!team) {
        throw new Error("You are not leading any team");
    }

    // Leader cannot remove themselves
    if (leaderId.toString() === memberId.toString()) {
        throw new Error("You cannot remove yourself. Delete the team instead.");
    }

    // Find member
    const member = await User.findById(memberId);

    if (!member) {
        throw new Error("Member not found");
    }

    // Member must belong to this team
    if (
        !member.teamId ||
        member.teamId.toString() !== team._id.toString()
    ) {
        throw new Error("Player is not a member of your team");
    }

    // Remove member from team
    team.members = team.members.filter(
        (m) => m.userId.toString() !== memberId.toString()
    );

    await team.save();

    // Update member
    member.teamId = null;
    member.role = "PLAYER";

    await member.save();

    return {
        message: "Member removed successfully"
    };
};

//LEAVE TEAM
export const leaveTeam = async (userId) => {

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (!user.teamId) {
        throw new Error("You are not part of any team");
    }

    // Find the team
    const team = await Team.findById(user.teamId);

    if (!team) {
        throw new Error("Team not found");
    }

    // Leader cannot leave
    if (team.leaderId.toString() === userId.toString()) {
        throw new Error(
            "You are the team leader. Delete the team before leaving."
        );
    }

    // Remove user from members array
    team.members = team.members.filter(
        (member) => member.userId.toString() !== userId.toString()
    );

    await team.save();

    // Update user
    user.teamId = null;
    user.role = "PLAYER";

    await user.save();

    return {
        message: "Left team successfully"
    };
};

//DELETE TEAM
export const deleteTeam = async (leaderId) => {

    const team = await Team.findOne({ leaderId });

    if (!team) {
        throw new Error("You are not leading any team");
    }

    await User.updateMany(
        {
            _id: {
                $in: team.members.map(member => member.userId)
            }
        },
        {
            $set: {
                teamId: null,
                role: "PLAYER"
            }
        }
    );

    await JoinRequest.deleteMany({
        teamId: team._id
    });

    await Team.deleteOne({
        _id: team._id
    });

    return {
        message: "Team deleted successfully"
    };
};