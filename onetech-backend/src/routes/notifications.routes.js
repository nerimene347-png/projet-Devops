const express = require("express");
const {
  getNotifications,
  marquerCommeLue,
  creerNotification,
} = require("../controllers/notifications.controller");
const { protect } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const router = express.Router();

router.use(protect);

router.get("/", getNotifications);
router.patch("/:id/lu", marquerCommeLue);
router.post(
  "/",
  requireRole("Administrateur", "DRH", "RSSI", "Manager Qualité"),
  creerNotification,
);

module.exports = router;
