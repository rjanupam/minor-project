import express from "express";
import authenticateToken from "../middlewares/authWare.js";
import { add, search } from "../controllers/patientController.js";

const router = express.Router();

router.post("/new", authenticateToken, add);
router.get("/search", authenticateToken, search);

export default router;
