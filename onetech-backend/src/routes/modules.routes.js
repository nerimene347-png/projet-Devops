const express = require("express");
const {
  getModules,
  getModuleById,
  majProgression,
  creerModule,
  modifierModule,
  supprimerModule,
} = require("../controllers/modules.controller");
const { protect } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const router = express.Router();

const ADMINS_CONTENU = ["Administrateur", "Manager Qualité", "RSSI"];

router.use(protect);

router.get("/", getModules);
router.get("/:id", getModuleById);
router.patch("/:id/progression", majProgression);

router.post("/", requireRole(...ADMINS_CONTENU), creerModule);
router.put("/:id", requireRole(...ADMINS_CONTENU), modifierModule);
router.delete("/:id", requireRole(...ADMINS_CONTENU), supprimerModule);

module.exports = router;
