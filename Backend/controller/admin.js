import { Admin } from "../models/admin.model.js";
import ErrorHandler from "../middlewares/error.js";

export const createAdmin = async (req, res, next) => {
  try {
    const { admin_id, email_id, response } = req.body;

    // Check if the admin record already exists
    const existingAdmin = await Admin.findOne({ admin_id });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin record with this admin_id already exists.",
      });
    }

    // Create a new admin instance
    const newAdmin = new Admin({
      admin_id,
      email_id,
      response
    });

    // Save the new admin record to the database
    await newAdmin.save();
    res.status(201).json({
      success: true,
      message: "Record has been created successfully",
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

export default createAdmin;
