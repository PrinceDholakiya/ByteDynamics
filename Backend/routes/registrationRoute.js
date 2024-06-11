import express from "express";
import send_registration from "../controller/registration.js";

const router = express.Router();

router.post("/send", send_registration);

export default router;