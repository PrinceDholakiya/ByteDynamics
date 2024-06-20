import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  admin_id: { type: Number, unique: true },
  email_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true
  },
  response: String
});

export const Admin = mongoose.model("Admin", adminSchema);
