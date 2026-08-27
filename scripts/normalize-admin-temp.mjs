import fs from "fs";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const uri = fs.readFileSync(".env.local", "utf8")
  .match(/^MONGODB_URI=(.*)$/m)?.[1]
  ?.trim()
  .replace(/^['"]|['"]$/g, "");
const email = "2024kucp1053@iiitkota.ac.in";
const password = "12345678";

if (!uri) throw new Error("MONGODB_URI not found");
await mongoose.connect(uri);
const users = mongoose.connection.collection("users");
const dollar = String.fromCharCode(36);
const user = await users.findOne({
  [dollar + "or"]: [
    { collegeEmail: { [dollar + "regex"]: "^2024kucp1053@iiitkota\\.ac\\.in$", [dollar + "options"]: "i" } },
    { email: { [dollar + "regex"]: "^2024kucp1053@iiitkota\\.ac\\.in$", [dollar + "options"]: "i" } },
  ],
});

if (!user) {
  console.log("NO_MATCH");
} else {
  const hash = await bcrypt.hash(password, 10);
  const result = await users.updateOne(
    { _id: user._id },
    { [dollar + "set"]: { email, collegeEmail: email, role: "ADMIN", password: hash, updatedAt: new Date() } }
  );
  console.log(JSON.stringify({ matched: result.matchedCount, modified: result.modifiedCount, role: "ADMIN" }));
}

await mongoose.disconnect();
