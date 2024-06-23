import express from "express";
import send_credit from "../controller/creditDetail.js";

const router = express.Router();

router.post("/send", send_credit);

export default router;