import express from "express";
import send_member from "../controller/member.js";

const router = express.Router();

router.post("/send", send_member);

export default router;