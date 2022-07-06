const express = require("express");
const trainController = require("../controllers/trainController");

const router = express.Router();

router.post("/confirm-train/:id", trainController.confirmTrip);

module.exports = router;
