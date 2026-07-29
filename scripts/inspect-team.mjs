import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load env variables manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, "../.env.local");

let MONGODB_URI = "";
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  const match = content.match(/MONGODB_URI=["']?([^"'\r\n]+)["']?/);
  if (match) {
    MONGODB_URI = match[1];
  }
}

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in env");
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db;
  const members = await db.collection("iecteammembers").find({}).toArray();
  
  console.log("Found members count:", members.length);
  if (members.length > 0) {
    console.log("Sample member:", JSON.stringify(members[0], null, 2));
    console.log("All members names and colleges:");
    members.forEach(m => {
      console.log(`- ${m.name}: college = "${m.college}", role = "${m.role}"`);
    });
  }

  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
