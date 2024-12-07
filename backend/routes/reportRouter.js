const express = require("express");
const authWare = require("../middlewares/authWare");
const { add, getByAuthor, getByPatient } = require("../controllers/reports");

const router = express.Router();

router.post("/add", authWare, add);
router.get("/get_by_author", authWare, getByAuthor);
router.get("/get_by_patient", authWare, getByPatient);

module.exports = router;
