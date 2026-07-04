import { withAuth } from "@/lib/helpers/apiHandler";
import { leaveTeam } from "@/lib/service/team.service";

export const POST = withAuth(async (req, currentUser) => {

    const result = await leaveTeam(currentUser._id);

    return Response.json({
        success: true,
        ...result
    });

});