import { LogAccess } from "../models/logAccess.model.js";
import ErrorHandler from "../middlewares/error.js";

const logAccessController = async (req, res, next) => {
  try {
    const {
      log_id,
      email,
      member_id,
      securityCode,
      dateTime,
      isValid,
      img
    } = req.body;

    // Create a new log access instance
    const newLogAccess = new LogAccess({
      log_id,
      email,
      member_id,
      securityCode,
      dateTime,
      isValid,
      img
    });

    // Save the new log access to the database
    await newLogAccess.save();
    res.status(201).json({
      success: true,
      message: "Log access has been saved successfully",
      data: newLogAccess
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

export default logAccessController;
