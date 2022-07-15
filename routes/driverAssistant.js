const express = require("express");
const driverAssistantController = require("../controllers/driverAssistantController");

const router = express.Router();

router.get("/", driverAssistantController.getDriverAssistants);

module.exports = router;
