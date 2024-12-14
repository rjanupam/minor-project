import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRouter from "./routes/authRouter.js";
import classifyRouter from "./routes/classifyRouter.js";
import patientRouter from "./routes/patientRouter.js";
import reportRouter from "./routes/reportRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/classify", classifyRouter);
app.use("/api/patient", patientRouter);
app.use("/api/report", reportRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => res.send("you shouldnt be here"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
