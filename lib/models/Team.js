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

    game: {
      type: String,
      enum: ["BGMI", "VALORANT", "FREEFIRE"],
      required: true,
    },

    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    members: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["MEMBER", "SUBSTITUTE"],
          default: "MEMBER",
        },
      },
    ],
   
    // intra points
    
    // inter league 
    

    maxPlayers: Number,
  },
  { timestamps: true },
);

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
