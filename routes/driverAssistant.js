const express = require("express");
const driverAssistantController = require("../controllers/driverAssistantController");

const router = express.Router();

router.get("/", driverAssistantController.getDriverAssistants);
router.post("/updateAvailability", driverAssistantController.updateAvailability);

module.exports = router;
