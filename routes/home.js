const express = require("express");
const homeController = require("../controllers/homeController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", homeController.viewHome);
router.get("/dashboard", requireAuth, homeController.viewDashboard);


module.exports = router;