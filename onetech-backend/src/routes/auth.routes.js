const express = require("express");
const rateLimit = require("express-rate-limit");
const { login, getCurrentUser } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// Anti brute-force sur le login AD : 10 tentatives / 15 min / IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Trop de tentatives de connexion. Réessayez plus tard.",
  },
});

router.post("/login", loginLimiter, login);
router.get("/me", protect, getCurrentUser);

module.exports = router;
