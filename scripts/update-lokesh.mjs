import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load env variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in env");
  process.exit(1);
}

// Define Schema
const IECTeamMemberSchema = new mongoose.Schema(
  {
    name: String,
    linkedin: String,
  },
  { collection: "iecteammembers" }
);

const IECTeamMember = mongoose.models.IECTeamMember || mongoose.model("IECTeamMember", IECTeamMemberSchema);

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Update Lokesh Meena
  const res = await IECTeamMember.updateOne(
    { name: { $regex: new RegExp("^Lokesh Meena$", "i") } },
    { $set: { linkedin: "https://www.linkedin.com/in/lokesh-meena-029244288/" } }
  );

  console.log("Update result:", res);

  await mongoose.disconnect();
  console.log("Disconnected");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
