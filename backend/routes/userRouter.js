const express = require("express");
const authenticateToken = require("../middlewares/authWare");
const { userView } = require("../controllers/userController");

const router = express.Router();

router.get("/:user", authenticateToken, userView);

module.exports = router;
