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

// Define Schema
const IECTeamMemberSchema = new mongoose.Schema(
  {
    name: String,
    college: String,
    linkedin: String,
  },
  { collection: "iecteammembers" }
);

const IECTeamMember = mongoose.models.IECTeamMember || mongoose.model("IECTeamMember", IECTeamMemberSchema);

const collegeMapping = {
  "Lokesh Meena": "IIIT Kota",
  "Ankur Singh": "IIIT Kota",
  "Shikhar Asthana": "IIIT Kota",
  "Mukesh Bana": "IIIT Kota",
  "Rudraksh Gupta": "IIIT Kota",
  "Rahul Tiwari": "IIIT Kota",
  "Advik": "IIIT Kalyani",
  "Narasimha Chava": "IIIT Nagpur",
  "Samay Jain": "IIIT Nagpur",
  "Harshit kumar": "IIIT Nagpur",
  "Anand Raj": "IIIT Lucknow",
  "Gouransh Sattavan": "IIIT Kota",
  "Sinchan Mondal": "IIIT Kalyani",
  "Anshu yadav": "IIIT Kota",
  "Harshit Badsara": "IIIT Kota",
  "Shivmangal Kushwaha": "IIIT Kota",
  "Sujeet Kumar": "IIIT Kota",
  "Paarth Singh": "IIIT Kota",
  "Sahil Jawale": "IIIT Nagpur",
  "Arya Malik": "IIIT Kota",
  "Parth Verma": "IIIT Nagpur",
  "Garvit Khicher": "IIIT Kota",
  "Ankan Patra": "IIIT Kalyani",
  "Ankit Kumar": "IIIT Kota",
  "Kushagra Srivastava": "IIIT Kota",
  "Kishlay Singh": "IIIT Kota",
  "Priyanshu Singh Shekhawat": "IIIT Kota",
  "SHAIK ZUBEDHA": "IIIT Sri City",
  "Parth Nandkishor Thutte": "IIIT Nagpur",
  "Rathod Rithwika": "IIIT Nagpur",
  "DIVYANSH GUPTA": "IIIT Kota",
  "Aarya Shah": "IIIT Nagpur",
  "Apurva Dhairya Bisht": "IIIT Kota",
  "Rishav Kumar": "IIIT Kota",
  "Varun Raj": "IIIT Kota",
  "Shlok Mhatre": "IIIT Nagpur",
  "Raghvendra Singh": "IIIT Nagpur",
  "Neel Tijare": "IIIT Nagpur",
  "Sarthak Yash Kumar": "IIIT Kota"
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const members = await IECTeamMember.find({});
  console.log(`Found ${members.length} members to update.`);

  for (const member of members) {
    const trimmedName = member.name.trim();
    // Match name exactly or look for key in collegeMapping
    let college = "IIIT Kota"; // default fallback
    
    for (const key of Object.keys(collegeMapping)) {
      if (trimmedName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(trimmedName.toLowerCase())) {
        college = collegeMapping[key];
        break;
      }
    }

    member.college = college;
    
    // Also check if we are updating Lokesh Meena's LinkedIn URL
    if (trimmedName.toLowerCase().includes("lokesh meena")) {
      member.linkedin = "https://www.linkedin.com/in/lokesh-meena-029244288/";
      console.log(`Updated Lokesh Meena LinkedIn profile.`);
    }

    await member.save();
    console.log(`Updated ${member.name} -> college: ${college}`);
  }

  console.log("Database update completed!");
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
