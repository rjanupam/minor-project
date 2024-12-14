import express from "express";
import authenticateToken from "../middlewares/authWare.js";
import { userView } from "../controllers/userController.js";

const router = express.Router();

router.get("/:user", authenticateToken, userView);

export default router;
