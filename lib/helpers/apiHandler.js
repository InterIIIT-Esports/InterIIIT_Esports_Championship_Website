import { dbConnect } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";

export const withAuth = (handler) => {
    return async (req) => {
        try {

            // Connect to MongoDB
            await dbConnect();

            // Authenticate user
            const currentUser = await requireAuth(req);

            // Execute actual route logic
            return await handler(req, currentUser);

        } catch (err) {

            let status = 500;

            switch (err.message) {
                case "Authorization header missing":
                case "Invalid authorization header":
                case "Token missing":
                case "jwt malformed":
                case "invalid token":
                case "jwt expired":
                    status = 401;
                    break;

                case "User not found":
                    status = 404;
                    break;

                default:
                    status = 400;
            }

            return Response.json(
                {
                    success: false,
                    message: err.message
                },
                {
                    status
                }
            );
        }
    };
};