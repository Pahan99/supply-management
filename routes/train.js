const express = require("express");
const trainController = require("../controllers/trainController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/trips", requireAuth, trainController.getTrainTrips);
router.get("/trip-details/:trip/:status", trainController.getTrainTripDetails);
router.post("/confirm-train/:id", trainController.confirmTrip);

module.exports = router;
