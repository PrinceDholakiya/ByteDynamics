import express from "express";
import { createAuthentication } from "../controller/authentication.js";

const router = express.Router();

router.post("/authentication", createAuthentication);

export default router;
