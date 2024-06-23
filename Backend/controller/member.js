import ErrorHandler from "../middlewares/error.js";
import { Member } from "../models/member.model.js";

const send_member = async (req, res, next) => {
  try {
    const {
      member_id,
      email_id,
      memberName,
      securityCode,
      phoneNumber,
      lastUpdateDate,
      DOB
    } = req.body;

    // Check if the email already exists
    const existingUser = await Member.findOne({ member_id });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Member is already exists",
      });
    }

    // Create a new user instance
    const newMemberRegistration = new Member({
      member_id,
      registration: email_id,
      memberName,
      securityCode,
      phoneNumber,
      lastUpdateDate,
      DOB
    });

    // Save the new user to the database
    await newMemberRegistration.save();
    res.status(201).json({
      success: true,
      message: "Member registered successfully",
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

export default send_member;