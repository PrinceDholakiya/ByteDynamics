import mongoose from "mongoose";

const logAccessSchema = new mongoose.Schema({
  log_id: { type: Number, unique: true },
  email_id: { 
    type: mongoose.Schema.Types.String, 
    ref: 'Registration',
    required: true 
  },
  member_id: Number,
  securityCode: String,
  dateTime : { type: Date, default: Date.now },
  isValid: Boolean,
  img: String
});

export const LogAccess = mongoose.model('logAccess', logAccessSchema);