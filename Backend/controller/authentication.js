import { Authentication } from "../models/authentication.model.js";
import ErrorHandler from "../middlewares/error.js";

export const createAuthentication = async (req, res, next) => {
  try {
    const { auth_id, registration, member, OTP } = req.body;

    // Check if the authentication record already exists
    const existingAuth = await Authentication.findOne({ auth_id });
    if (existingAuth) {
      return res.status(400).json({
        success: false,
        message: "Authentication record with this auth_id already exists.",
      });
    }

    // Create a new authentication instance
    const newAuthentication = new Authentication({
      auth_id,
      registration,
      member,
      OTP,
    });

    // Save the new authentication record to the database
    await newAuthentication.save();
    res.status(201).json({
      success: true,
      message: "Authentication record has been created successfully",
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

export default createAuthentication;
