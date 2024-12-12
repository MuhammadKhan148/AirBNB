const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Register user route
router.post("/register", userController.registerUser);

// Login user route
router.post("/login", userController.loginUser);

module.exports = router;
