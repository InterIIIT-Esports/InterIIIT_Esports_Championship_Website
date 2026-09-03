import { dbConnect } from "@/lib/mongodb";
import { createTeam } from "@/lib/service/team.service";
import { requireAuth } from "@/lib/auth";

export async function POST(req) {
  await dbConnect();

  try {
    // Authenticate the user using the JWT
    const user = await requireAuth(req);

    if (user.role !== "ADMIN") {
      return Response.json(
        {
          success: false,
          message: "Team registrations are closed now. Only admins can add new teams.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Create team using the logged-in user's game
    const team = await createTeam({
      userId: user._id,
      name: body.name,
      game: user.game,
    });

    return Response.json({
      success: true,
      message: "Team created successfully",
      team,
    });

  } catch (e) {
    return Response.json(
      {
        success: false,
        message: e.message,
      },
      {
        status: 400,
      }
    );
  }
}