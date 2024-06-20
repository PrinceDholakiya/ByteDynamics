import mongoose from "mongoose";

const logAccessSchema = new mongoose.Schema({
  log_id: { type: Number, unique: true },
  registration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
  member_id: Number,
  securityCode: String,
  dateTime : { type: Date, default: Date.now },
  isValid: Boolean,
  img: String
});

export const LogAccess = mongoose.model('logAccess', logAccessSchema);