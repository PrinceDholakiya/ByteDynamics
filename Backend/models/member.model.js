import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  member_id: { type: String, unique: true },
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
  memberName: String,
  securityCode: String,
  phoneNumber: String,
  lastUpdateDate: { type: Date, default: Date.now }, // Set default value to current date
  DOB: Date,
});

export const Member = mongoose.model("Member", memberSchema);
