import express from "express";
import createSubscription from "../controller/subscription.js";

const router = express.Router();

router.post("/subscription", createSubscription);

export default router;
