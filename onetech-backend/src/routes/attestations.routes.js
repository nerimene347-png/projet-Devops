const express = require("express");
const {
  getMesAttestations,
  telechargerAttestation,
} = require("../controllers/attestations.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protect);

router.get("/", getMesAttestations);
router.get("/:moduleId/pdf", telechargerAttestation);

module.exports = router;
