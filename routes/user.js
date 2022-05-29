const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/login", userController.viewLogin);

module.exports = router;