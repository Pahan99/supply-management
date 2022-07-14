const express = require("express");
const reportController = require("../controllers/reportController");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/updateSalesByYear", requireAuth, reportController.updateSalesByYear);
router.post("/updateSalesByBranch", requireAuth, reportController.updateSalesByBranch);


module.exports = router;