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
    wins: { type: Number, default: 0 },
    kills: { type: Number, default: 0 },
    deaths: { type: Number, default: 0 },
    kdRatio: { type: Number, default: 0 },

    // Leaderboard stage tags & elimination status
    tag: { type: String, default: "" }, // e.g. "Top 16", "Top 8", "Top 4", "Finalist", "Winner"
    isEliminated: { type: Boolean, default: false },
    eliminationNote: { type: String, default: "" }, // e.g. "in round 3"

    game: {
      type: String,
      enum: ["BGMI", "VALORANT", "FREEFIRE"],
      required: true,
    },

    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, sparse: true },

    // For admin-created teams (no linked User account)
    leaderName: { type: String, default: "" },
    leaderImage: { type: String, default: "" },
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
