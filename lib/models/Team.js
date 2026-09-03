import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },

    // no of games 
    // matches played 
    // wins
    // loss
    // placemenr points 
    // kill points 

    points: { type: Number, default: 0 },
    matchesPlayed: { type: Number, default: 0 },

    game: {
      type: String,
      enum: ["BGMI", "VALORANT", "FREEFIRE"],
      required: true,
    },

    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, sparse: true, default: null },

    // For admin-created teams (no linked User account)
    leaderName: { type: String, default: "" },
    collegeLogo: { type: String, default: "" },
    isAdminCreated: { type: Boolean, default: false },

    // Display-only roster for admin-created teams (not linked to User docs)
    playerRoster: [
      {
        name: { type: String, required: true },
        imageUrl: { type: String, default: "" },
      },
    ],

    college: {
      type: String,
      required : true,
    },

    members: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["MEMBER", "SUBSTITUTE", "LEADER"],
          default: "MEMBER",
        },
      },
    ],
   
    maxPlayers: Number,

    inviteCode: {
      type: String,
      unique: true,
      sparse: true,
    },

    banner: { type: String, default: "" },
    bannerPublicId: { type: String, default: "" },

    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
