import express from "express";
import login from "../controller/login.js";

const router = express.Router();

// POST /api/v1/login
router.post("/login", login); // Use the imported function directly as the callback

export default router;