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

    const team = await Team.create({
      name: name.trim(),
      game,
      college: college.trim(),
      leaderName: leaderName.trim(),
      collegeLogo,
      isAdminCreated: true,
      isRegistered: true,
      leaderId: null,
      maxPlayers: gameConfig.maxPlayers,
      inviteCode: generateInviteCode(),
      members: [],
      playerRoster,
    });

    return Response.json({
      success: true,
      message: "Team created successfully by admin",
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

