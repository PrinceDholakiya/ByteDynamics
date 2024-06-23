import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import { dbConnection } from "./database/dbConnection.js";
import registrationRoute from "./routes/registrationRoute.js";
import loginRoute from "./routes/loginRoute.js";
import premiumRoute from "./routes/premiumRoute.js";
import logAccessRoute from "./routes/logAccessRoute.js";
import memberRoute from "./routes/memberRoute.js";
import authenticationRoute from "./routes/authenticationRoute.js";
import reservationRoute from "./routes/reservationRoute.js";
import creditRoute from "./routes/creditRoute.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/registration", registrationRoute); // Registration
app.use("/api/v1/login", loginRoute); // Registration
app.use("/api/v1/premium", premiumRoute); // Registration
app.use("/api/v1/logAccess", logAccessRoute); // logAccess
app.use("/api/v1/member", memberRoute); // Member
app.use("/api/v1/authentication", authenticationRoute); // Authentication
app.use("/api/v1/reservation", reservationRoute); // Contact Us
app.use("/api/v1/creditDetail", creditRoute); // Credit Detail

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Successfully...",
  });
});

dbConnection();

app.use(errorMiddleware);

export default app;
