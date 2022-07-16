const express = require("express");
const driverController = require("../controllers/driverController");

const router = express.Router();

router.get("/", driverController.getDrivers);
router.post("/updateAvailability", driverController.updateAvailability);

module.exports = router;
