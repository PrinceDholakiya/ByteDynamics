import ErrorHandler from "../middlewares/error.js";
import { Credit } from "../models/credit.model.js";
import { Registration } from "../models/registration.model.js";
import CryptoJS from "crypto-js";

const encryptionKey = "your-secret-key"; // Replace with your secret key

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, encryptionKey).toString();
};

const send_credit = async (req, res, next) => {
  try {
    const {
      Email_Id,
      CardHolderName,
      CardNumber,
      ExpiryDate,
      CVV
    } = req.body;

    const existingCredit = await Credit.findOne({ CardNumber });
    if (existingCredit) {
      return res.status(400).json({
        success: false,
        message: "This Credit Card is already exists",
      });
    }

    const existingRegistration = await Registration.findById(Email_Id);
    if (!existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "Registered Email does not exist",
      });
    }
    
    // Encrypt sensitive information
    const encryptedCardNumber = encryptData(CardNumber);
    const encryptedExpiryDate = encryptData(ExpiryDate);
    const encryptedCVV = encryptData(CVV.toString());

    const newCredit = new Credit({
      Email_Id,
      CardHolderName,
      CardNumber: encryptedCardNumber,
      ExpiryDate: encryptedExpiryDate,
      CVV: encryptedCVV
    });

    // Save the new credit to the database
    await newCredit.save();
    res.status(201).json({
      success: true,
      message: "Credit record registered successfully",
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

export default send_credit;
