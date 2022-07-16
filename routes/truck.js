const express = require("express");
const truckController = require("../controllers/truckController");

const router = express.Router();

router.post(
  "/update-assigned/:delivery/:driver/:assistant",
  truckController.updateAssigned
);

router.post(
  "/update-order/:delivery/:order",
  truckController.updateDeliveryOrder
);

module.exports = router;
