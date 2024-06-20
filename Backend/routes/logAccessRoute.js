import express from "express";
import logAccessController from "../controller/logaccess.js";

const router = express.Router();

router.post("/log-Access", logAccessController);

export default router;
