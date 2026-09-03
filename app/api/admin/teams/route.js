import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/helpers/adminAuth";
import Team from "@/lib/models/Team";
import User from "@/lib/models/User"; // needed for population
import JoinRequest from "@/lib/models/JoinRequest";
import Invitation from "@/lib/models/Invitation";
import CollegeRequest from "@/lib/models/CollegeRequest";
import { GAMES } from "@/lib/constants/games";
import crypto from "crypto";

const generateInviteCode = () => crypto.randomBytes(3).toString("hex").toUpperCase();

export async function GET(req) {
  await dbConnect();

  try {
    await requireAdmin(req);

    const teams = await Team.find({})
      .populate("leaderId", "name email collegeEmail")
      .sort({ createdAt: -1 });

    return Response.json({
      success: true,
      teams,
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    await requireAdmin(req);

    const body = await req.json();
    const { name, college, game, leaderName, players } = body;

    // Validate required fields
    if (!name?.trim()) {
      return Response.json({ success: false, message: "Team name is required" }, { status: 400 });
    }
    if (!college?.trim()) {
      return Response.json({ success: false, message: "College name is required" }, { status: 400 });
    }
    if (!game || !GAMES[game]) {
      return Response.json({ success: false, message: "Invalid game. Must be BGMI, VALORANT, or FREEFIRE" }, { status: 400 });
    }
    if (!leaderName?.trim()) {
      return Response.json({ success: false, message: "Team leader name is required" }, { status: 400 });
    }

    // Check for duplicate team name
    const existingTeam = await Team.findOne({ name: name.trim() });
    if (existingTeam) {
      return Response.json({ success: false, message: "A team with this name already exists" }, { status: 400 });
    }

    // Look up college logo from CollegeRequest
    let collegeLogo = "";
    const collegeReq = await CollegeRequest.findOne({
      college_name: { $regex: new RegExp("^" + college.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "i") },
      status: "Approved",
    });
    if (collegeReq && collegeReq.college_logo) {
      collegeLogo = collegeReq.college_logo;
    }

    // Build player roster (optional)
    const playerRoster = [];
    if (Array.isArray(players)) {
      for (const p of players) {
        if (p.name?.trim()) {
          playerRoster.push({
            name: p.name.trim(),
            imageUrl: p.imageUrl?.trim() || "",
          });
        }
      }
    }

    const gameConfig = GAMES[game];

    const teamPayload = {
      name: name.trim(),
      game,
      college: college.trim(),
      leaderName: leaderName.trim(),
      collegeLogo,
      isAdminCreated: true,
      isRegistered: true,
      maxPlayers: gameConfig.maxPlayers,
      inviteCode: generateInviteCode(),
      members: [],
      playerRoster,
    };

    let team;
    try {
      team = await Team.create(teamPayload);
    } catch (err) {
      // If MongoDB has a stale non-sparse leaderId index or leaderId: null conflict
      if (err.message && (err.message.includes("leaderId") || err.code === 11000)) {
        await Team.collection.dropIndex("leaderId_1").catch(() => {});
        await Team.updateMany({ leaderId: null }, { $unset: { leaderId: "" } }).catch(() => {});
        team = await Team.create(teamPayload);
      } else {
        throw err;
      }
    }

    return Response.json({
      success: true,
      message: "Team created successfully by admin",
      team,
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await dbConnect();

  try {
    await requireAdmin(req);

    const body = await req.json();
    const { teamId, name, college, game, leaderName, players, isRegistered } = body;

    if (!teamId) {
      return Response.json({ success: false, message: "Team ID is required" }, { status: 400 });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return Response.json({ success: false, message: "Team not found" }, { status: 404 });
    }

    if (name && name.trim() !== team.name) {
      const existingTeam = await Team.findOne({ name: name.trim(), _id: { $ne: teamId } });
      if (existingTeam) {
        return Response.json({ success: false, message: "A team with this name already exists" }, { status: 400 });
      }
      team.name = name.trim();
    }

    if (college && college.trim() !== team.college) {
      team.college = college.trim();
      const collegeReq = await CollegeRequest.findOne({
        college_name: { $regex: new RegExp("^" + college.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "i") },
        status: "Approved",
      });
      if (collegeReq && collegeReq.college_logo) {
        team.collegeLogo = collegeReq.college_logo;
      }
    }

    if (game && GAMES[game]) {
      team.game = game;
      team.maxPlayers = GAMES[game].maxPlayers;
    }

    if (leaderName !== undefined) {
      team.leaderName = leaderName.trim();
    }

    if (typeof isRegistered === "boolean") {
      team.isRegistered = isRegistered;
    }

    if (Array.isArray(players)) {
      const playerRoster = [];
      for (const p of players) {
        if (p.name?.trim()) {
          playerRoster.push({
            name: p.name.trim(),
            imageUrl: p.imageUrl?.trim() || "",
          });
        }
      }
      team.playerRoster = playerRoster;
    }

    await team.save();

    return Response.json({
      success: true,
      message: "Team updated successfully",
      team,
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    await requireAdmin(req);

    const url = new URL(req.url);
    const teamId = url.searchParams.get("teamId");
    let teamIds = [];

    if (!teamId) {
      const body = await req.json().catch(() => ({}));
      teamIds = Array.isArray(body.teamIds) ? body.teamIds : [];
    } else {
      teamIds = [teamId];
    }

    if (teamIds.length === 0) {
      return Response.json({ success: false, message: "At least one team ID is required" }, { status: 400 });
    }

    const teams = await Team.find({ _id: { $in: teamIds } });
    if (teams.length === 0) {
      return Response.json({ success: false, message: "Team not found" }, { status: 404 });
    }

    const ids = teams.map((team) => team._id);
    const memberIds = teams.flatMap((team) => team.members.map((member) => member.userId));

    await User.updateMany(
      { _id: { $in: memberIds } },
      { $set: { teamId: null, role: "PLAYER" } }
    );

    await JoinRequest.deleteMany({ teamId: { $in: ids } });
    await Invitation.deleteMany({ teamId: { $in: ids } });
    await Team.deleteMany({ _id: { $in: ids } });

    return Response.json({
      success: true,
      message: `${teams.length} team${teams.length === 1 ? "" : "s"} deleted successfully`,
    });
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}

