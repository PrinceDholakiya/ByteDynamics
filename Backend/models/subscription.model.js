import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  subscription_id: { type: Number, unique: true },
  credit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Credit",
    required: true,
  },
  premium: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Premium",
    required: true,
  },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true,
  },
  subsEndDate: { type: Date, required: true },
  status: { type: String, required: true },
});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
