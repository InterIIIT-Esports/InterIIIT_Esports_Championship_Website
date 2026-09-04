import { dbConnect } from "@/lib/mongodb";
import Team from "@/lib/models/Team";

/**
 * GET /api/public/teams
 * Fetch registered teams, optionally sorted by points for a leaderboard.
 */
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const game = searchParams.get("game");
    const college = searchParams.get("college");
    const sort = searchParams.get("sort"); // "points" for leaderboard

    const filter = { isRegistered: true }; // Only show fully registered teams
    if (game) {
      filter.game = game.toUpperCase();
    }
    if (college) {
      filter.college = { $regex: new RegExp(college.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i") };
    }

    const query = Team.find(filter)
      .select("name college game points matchesPlayed wins kills deaths kdRatio maxPlayers members leaderName leaderImage collegeLogo leaderId isAdminCreated playerRoster")
      .populate("leaderId", "name")
      .populate("members.userId", "name");

    if (sort === "points") {
      query.sort({ points: -1, matchesPlayed: 1, createdAt: 1 });
    } else {
      query.sort({ createdAt: -1 });
    }

    const teams = await query.lean();

    return Response.json({ success: true, teams });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
