require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/db");

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

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/patient", require("./routes/patientRouter"));
app.use("/api/report", require("./routes/reportRouter"));
app.use("/api/user", require("./routes/userRouter"));

app.get("/", (req, res) => res.send("you shouldnt be here"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
