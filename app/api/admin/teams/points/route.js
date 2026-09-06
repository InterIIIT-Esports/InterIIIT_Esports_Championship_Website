import { dbConnect } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/helpers/adminAuth";
import Team from "@/lib/models/Team";

/**
 * PATCH /api/admin/teams/points
 * Update a team's points and matches played.
 */
export async function PATCH(req) {
  try {
    await requireAdmin(req);
    await dbConnect();

    const { teamId, points, matchesPlayed, wins, kills, deaths, kdRatio, tag, isEliminated, eliminationNote } = await req.json();

    if (!teamId) {
      return Response.json({ success: false, error: "Missing required teamId" }, { status: 400 });
    }

    const updateFields = {};
    if (points !== undefined) updateFields.points = Number(points);
    if (matchesPlayed !== undefined) updateFields.matchesPlayed = Number(matchesPlayed);
    if (wins !== undefined) updateFields.wins = Number(wins);
    if (kills !== undefined) updateFields.kills = Number(kills);
    if (deaths !== undefined) updateFields.deaths = Number(deaths);
    if (kdRatio !== undefined) updateFields.kdRatio = Number(kdRatio);
    if (tag !== undefined) updateFields.tag = String(tag).trim();
    if (isEliminated !== undefined) updateFields.isEliminated = Boolean(isEliminated);
    if (eliminationNote !== undefined) updateFields.eliminationNote = String(eliminationNote).trim();

    const team = await Team.findByIdAndUpdate(
      teamId,
      { $set: updateFields },
      { new: true }
    ).lean();

    if (!team) {
      return Response.json({ success: false, error: "Team not found" }, { status: 404 });
    }

    return Response.json({ success: true, team });
  } catch (err) {
    const status = err.message.includes("Admin") || err.message.includes("Auth") ? 401 : 500;
    return Response.json({ success: false, error: err.message }, { status });
  }
}
