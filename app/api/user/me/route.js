import { withAuth } from "@/lib/helpers/apiHandler";

export const GET = withAuth(async (req, currentUser) => {

    return Response.json({
        success: true,
        user: {
            id: currentUser._id,
            name: currentUser.name,
            email: currentUser.email,
            collegeEmail: currentUser.collegeEmail,
            college: currentUser.college,
            game: currentUser.game,
            role: currentUser.role,
            teamId: currentUser.teamId
        }
    });

});