const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/login", userController.handleLogin);
router.get("/logout", userController.handleLogout);

module.exports = router;