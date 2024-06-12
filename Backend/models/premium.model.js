import mongoose from "mongoose";

const premiumSchema = new mongoose.Schema({
  premium_id: { type: String, unique: true },
  premiumType: String,
  price: String,
  timeDuration: Number
});

export const Premium = mongoose.model('Premium', premiumSchema);