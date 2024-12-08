import express from "express";
import authenticateToken from "../middlewares/authWare.js";
import { patientView } from "../controllers/patientController.js";

const router = express.Router();

router.get("/:patient", authenticateToken, patientView);

export default router;
