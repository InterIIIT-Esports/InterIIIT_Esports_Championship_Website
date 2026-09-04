import { dbConnect } from "@/lib/mongodb";
import { registerUser } from "@/lib/service/user.service";

export async function POST() {
  return Response.json({ error: "Registrations are closed." }, { status: 403 });
}