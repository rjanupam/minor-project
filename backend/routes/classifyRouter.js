import express from "express";
import multer from "multer";
import { upload, classifyImage } from "../controllers/classifyController.js";

const router = express.Router();

router.post("/", upload.single("image"), classifyImage);

export default router;
