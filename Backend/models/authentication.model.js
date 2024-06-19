import mongoose from "mongoose";

const authenticationSchema = new mongoose.Schema({
  auth_id: { type: Number, unique: true },
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  lastupdatedate: { type: Date, default: Date.now },
  OTP: Number,
});

export const Authentication = mongoose.model("Authentication", authenticationSchema);
