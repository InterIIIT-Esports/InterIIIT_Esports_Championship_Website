import { withAuth } from "@/lib/helpers/apiHandler";
import { acceptJoinRequest } from "@/lib/service/team.service";

export const POST = withAuth(async (req, currentUser) => {

    const { requestId } = await req.json();

    if (!requestId) {
        throw new Error("Request ID is required.");
    }

    const result = await acceptJoinRequest(
        currentUser._id,
        requestId
    );

    return Response.json({
        success: true,
        ...result
    });

});