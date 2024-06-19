import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  member_id: { type: Number, unique: true },
  email_id: { 
    type: mongoose.Schema.Types.String, 
    ref: 'Registration',
    required: true 
  },
  member_name: String,
  securityCode: String,
  phoneNumber: Number,
  dateOfJoin: Date,
  lastUpdateDate: Date
})
export const Member = mongoose.model('Member', memberSchema);