import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,

    // total kill
    // kd ratio 
    // death count 
    // matches played 
   

    college: String,
    collegeEmail: { type: String, unique: true },

    game: {
      type: String,
      enum: ["BGMI", "VALORANT", "FREEFIRE"],
      required: true,
    },

    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    // substitute add krlean 

    role: {
      type: String,
      enum: ["PLAYER", "LEADER"],
      default: "PLAYER",
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
