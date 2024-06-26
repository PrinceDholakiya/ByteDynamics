// models/registration.model.js

import mongoose from "mongoose";
import validator from "validator";

const registrationSchema = new mongoose.Schema({
  email_id: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  dateOfJoin: {
    type: Date,
    default: Date.now,
  },
  DOB: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export const Registration = mongoose.model('Registration', registrationSchema);
