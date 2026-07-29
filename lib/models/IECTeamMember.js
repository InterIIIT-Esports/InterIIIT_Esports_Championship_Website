import mongoose from "mongoose";

const IECTeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image_url: { type: String, required: true },
    instagram: { type: String, default: null },
    linkedin: { type: String, default: null },
    college: { type: String, default: null },
    order: { type: Number, default: 0 },
    departments: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.IECTeamMember ||
  mongoose.model("IECTeamMember", IECTeamMemberSchema);
