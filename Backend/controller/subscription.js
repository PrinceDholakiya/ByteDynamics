import { Subscription } from "../models/subscription.model.js";
import ErrorHandler from "../middlewares/error.js";

export const createSubscription = async (req, res, next) => {
  try {
    const { subscription_id, credit, premium, email, subsEndDate, status } = req.body;

    // Check if the subscription record already exists
    const existingSubscription = await Subscription.findOne({ subscription_id });
    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: "Subscription with this ID already exists.",
      });
    }

    // Create a new subscription instance
    const newSubscription = new Subscription({
      subscription_id,
      credit,
      premium,
      email,
      subsEndDate,
      status,
    });

    // Save the new subscription record to the database
    await newSubscription.save();
    res.status(201).json({
      success: true,
      message: "Subscription successfull",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    // Handle other errors
    return next(error);
  }
};

export default createSubscription;
