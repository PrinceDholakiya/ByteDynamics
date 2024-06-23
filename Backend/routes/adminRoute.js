import express from "express";
import { createAdmin } from "../controller/admin.js";

const router = express.Router();

router.post("/admin", createAdmin);

export default router;
