const express = require("express");
const homeController = require("../controllers/homeController");

const router = express.Router();

router.get("/", homeController.viewHome);
router.get("/dashboard", homeController.viewDashboard);


module.exports = router;