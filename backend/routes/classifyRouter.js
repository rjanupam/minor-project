import express from "express";
import { upload, classifyImage } from "../controllers/classifyController.js";

const router = express.Router();

router.post("/", upload.single("image"), classifyImage);

export default router;
