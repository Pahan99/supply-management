const express = require("express");
const driverController = require("../controllers/driverController");

const router = express.Router();

router.get("/", driverController.getDrivers);
router.get("/getAvailability", driverController.getAvailability);
router.post("/updateAvailability", driverController.updateAvailability);

module.exports = router;
