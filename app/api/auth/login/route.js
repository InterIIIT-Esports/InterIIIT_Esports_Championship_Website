import { dbConnect } from "@/lib/mongodb";
import { loginUser } from "@/lib/service/user.service";

export async function POST(req) {

    await dbConnect ();

    try {

        const body = await req.json();

        const result = await loginUser(body);

        return Response.json({
            success: true,
            message: "Login successful",
            ...result
        });

    } catch (err) {

        return Response.json(
            {
                success: false,
                message: err.message
            },
            {
                status: 401
            }
        );
    }
}