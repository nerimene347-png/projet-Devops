const express = require("express");

const authRoutes = require("./auth.routes");
const modulesRoutes = require("./modules.routes");
const quizRoutes = require("./quiz.routes");
const usersRoutes = require("./users.routes");
const notificationsRoutes = require("./notifications.routes");
const statisticsRoutes = require("./statistics.routes");
const attestationsRoutes = require("./attestations.routes");

const router = express.Router();

router.get("/", (req, res) =>
  res.json({
    message:
      "API OneTech Business Solution — Sensibilisation Qualité & Sécurité",
  }),
);

router.use("/auth", authRoutes);
router.use("/modules", modulesRoutes);
router.use("/quizzes", quizRoutes);
router.use("/utilisateurs", usersRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/statistiques", statisticsRoutes);
router.use("/attestations", attestationsRoutes);

module.exports = router;
