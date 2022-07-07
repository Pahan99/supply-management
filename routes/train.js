const express = require("express");
const trainController = require("../controllers/trainController");

const router = express.Router();

router.get("/trips", trainController.getTrainTrips);
router.get("/trips/:branch", trainController.getTrainTripsByBranch);
router.post("/confirm-train/:id", trainController.confirmTrip);

module.exports = router;
