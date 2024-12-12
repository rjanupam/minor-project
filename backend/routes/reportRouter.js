import express from "express";
import authWare from "../middlewares/authWare.js";
import { add, search } from "../controllers/reportController.js";

const router = express.Router();

router.post("/new", authWare, add);
router.get("/search", authWare, search);

export default router;
