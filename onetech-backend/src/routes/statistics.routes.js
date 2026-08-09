const express = require("express");
const { getStatistiques } = require("../controllers/statistics.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protect);
router.get("/", getStatistiques);

module.exports = router;
