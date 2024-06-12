import express from "express";
import premium from "../controller/premium.js";

const router = express.Router();

router.post("/send", premium);

export default router;