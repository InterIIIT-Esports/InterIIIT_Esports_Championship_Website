import { withAuth } from "@/lib/helpers/apiHandler";
import { requestJoinTeam } from "@/lib/service/team.service";

export const POST = withAuth(async (req, currentUser) => {

    const { teamId } = await req.json();

    if (!teamId) {
        throw new Error("Team ID is required.");
    }

    const result = await requestJoinTeam(
        currentUser._id,
        teamId
    );

    return Response.json({
        success: true,
        ...result,
    });

});