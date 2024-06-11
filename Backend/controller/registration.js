import ErrorHandler from "../middlewares/error.js";
import { Registration } from "../models/registration.model.js";

const send_registration = async (req, res, next) => {
  try {
    const {
      email_id,
      firstName,
      lastName,
      password,
      phoneNumber,
      address,
      gender,
      dateOfJoin,
      DOB,
      isAdmin
    } = req.body;

    // Check if the email already exists
    const existingUser = await Registration.findOne({ email_id });
    if (existingUser) {
      res.status(400).json({
        success: true,
        message: "Email already exists",
      });
    }

    // Create a new user instance
    const newRegistration = new Registration({
      email_id,
      firstName,
      lastName,
      password,
      phoneNumber,
      address,
      gender,
      dateOfJoin,
      DOB,
      isAdmin
    });

    // Save the new user to the database
    await newRegistration.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
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

export default send_registration;