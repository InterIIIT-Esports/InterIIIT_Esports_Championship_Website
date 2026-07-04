import { withAuth } from "@/lib/helpers/apiHandler";
import { deleteTeam } from "@/lib/service/team.service";

export const DELETE = withAuth(async (req, currentUser) => {

    await deleteTeam(currentUser._id);

    return Response.json({
        success: true,
        message: "Team deleted successfully"
    });

});