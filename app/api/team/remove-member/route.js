import { withAuth } from "@/lib/helpers/apiHandler";
import { removeMember } from "@/lib/service/team.service";

export const POST = withAuth(async (req, currentUser) => {

    const { memberId } = await req.json();

    if (!memberId) {
        throw new Error("Member ID is required");
    }

    const result = await removeMember(currentUser._id, memberId);

    return Response.json({
        success: true,
        ...result
    });

});