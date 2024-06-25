import mongoose from "mongoose";

const creditSchema = new mongoose.Schema({
  CardNumber: { type: String, unique: true, required: true },
  Email_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
  CardHolderName: { type: String, required: true },
  ExpiryDate: { type: String, required: true },
  CVV: { type: String, required: true },
});

export const Credit = mongoose.model("Credit", creditSchema);
