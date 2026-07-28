import mongoose from "mongoose";

const CollegeRequestSchema = new mongoose.Schema(
  {
    college_name: { type: String, required: true, trim: true },
    college_logo: { type: String, required: true },
    college_website: { type: String, required: true, trim: true },

    club_name: { type: String, required: true, trim: true },
    club_email: { type: String, required: true, trim: true, lowercase: true },
    club_instagram: { type: String, required: true, trim: true },

    email_domain: { type: String, trim: true, lowercase: true }, // Added for validation

    coordinator_name: { type: String, required: true, trim: true },
    designation: {
      type: String,
      required: true,
      enum: ["President", "Head", "Secretary", "Coordinator", "Other"],
    },
    contact_number: { type: String, required: true, trim: true },
    whatsapp_number: { type: String, required: true, trim: true },

    description: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },

    intra_registration_form: { type: String, trim: true, default: "" },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    order: { type: Number, default: 0 },
    approved_at: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.CollegeRequest ||
  mongoose.model("CollegeRequest", CollegeRequestSchema);
