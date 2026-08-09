const express = require("express");
const {
  getUtilisateurs,
  changerRole,
  changerStatut,
} = require("../controllers/users.controller");
const { protect } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const router = express.Router();

router.use(protect);

router.get(
  "/",
  requireRole("Administrateur", "DRH", "Directeur Général"),
  getUtilisateurs,
);
router.patch("/:id/role", requireRole("Administrateur"), changerRole);
router.patch(
  "/:id/statut",
  requireRole("Administrateur", "DRH"),
  changerStatut,
);

module.exports = router;
