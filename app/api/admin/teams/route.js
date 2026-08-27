import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/helpers/adminAuth";
import Team from "@/lib/models/Team";
import User from "@/lib/models/User"; // needed for population
import JoinRequest from "@/lib/models/JoinRequest";
import Invitation from "@/lib/models/Invitation";

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
