const express = require("express");
const truckController = require("../controllers/truckController");

const router = express.Router();

router.post(
  "/update-assigned/:delivery/:driver/:assistant",
  truckController.updateAssigned
);

module.exports = router;
