import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  email_id: { type: String, unique: true },
  firstName: String,
  lastName: String,
  password: String,
  phoneNumber: String,
  // end_date: { type: Date, default: () => new Date(+new Date() + 365*24*60*60*1000) }, // Set default value to current date + 1 year
  address: String,
  gender: String,
  dateOfJoin: { type: Date, default: Date.now }, // Set default value to current date
  DOB: Date,
  isAdmin: { type: Boolean, default: false },
});

export const Registration = mongoose.model('Registration', registrationSchema);