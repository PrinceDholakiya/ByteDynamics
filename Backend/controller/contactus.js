import ErrorHandler from "../middlewares/error.js";
import { ContactUs } from "../models/contactus.model.js";

const send_contactus = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    await ContactUs.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "You will be connected with us shortly....",
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    // Handle other errors
    return next(error);
  }
};

export default send_contactus;