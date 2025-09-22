const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Rota de login
router.post("/login", authController.login);

// Rota de cadastro
router.post("/signup", authController.signup);

module.exports = router;
