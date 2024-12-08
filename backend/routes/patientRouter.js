const express = require("express");
const authenticateToken = require("../middlewares/authWare");
const { patientView } = require("../controllers/patientController");

const router = express.Router();

router.get("/:patient", authenticateToken, patientView);

module.exports = router;
