import express from "express";
import authWare from "../middlewares/authWare.js";
import {
  add,
  getByAuthor,
  getByPatient,
} from "../controllers/reportController.js";

const router = express.Router();

router.post("/add", authWare, add);
router.get("/get_by_author", authWare, getByAuthor);
router.get("/get_by_patient", authWare, getByPatient);

export default router;
