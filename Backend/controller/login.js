// controllers/loginController.js

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Registration } from "../models/registration.model.js";

const login = async (req, res, next) => {
  const { email_id, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const registration = await Registration.findOne({ password, email_id });

    if (!registration) {
        res.status(401).json({
            success: true,
            message: "Invalid email or password",
          });
    }

    // If the email and password are correct, generate a JWT token
    const token = jwt.sign(
      { userId: registration._id, email: registration.email_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send the token in the response
    res.status(200).json({
        token,
        registrationId: registration._id,
        success: true,
        message: "Login Success",
      });

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default login;