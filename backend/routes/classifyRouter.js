import express from "express";
import multer from "multer";
import { classifyImage } from "../controllers/classifyController.js";

const router = express.Router();

const upload = multer({ dest: "tmp/" });

router.post("/", upload.single("image"), classifyImage);

export default router;
