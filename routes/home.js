const express = require("express");
const userController = require("../controllers/homeController");

const router = express.Router();

router.get("/", userController.viewHome);

module.exports = router;