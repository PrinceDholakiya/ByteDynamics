import ErrorHandler from "../middlewares/error.js";
import { Premium } from "../models/premium.model.js";

const premium = async (req, res, next) => {
  try {
    const {
      premium_id,
      premiumType,
      price,
      timeDuration
    } = req.body;

    // Check if the email already exists
    const existingType = await Premium.findOne({ premiumType });
    if (existingType) {
      res.status(400).json({
        success: true,
        message: "Premium type is already exist.",
      });
    }

    // Create a new user instance
    const newPremium = new Premium({
      premium_id,
      premiumType,
      price,
      timeDuration
    });

    // Save the new user to the database
    await newPremium.save();
    res.status(201).json({
      success: true,
      message: "Premium type has been added successfully",
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

export default premium;