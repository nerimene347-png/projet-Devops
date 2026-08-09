const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const { jwtSecret } = require("../config/env");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    throw new ApiError(
      401,
      "Authentification requise. Veuillez vous connecter.",
    );
  }

  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new ApiError(
      401,
      "Session invalide ou expirée. Veuillez vous reconnecter.",
    );
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new ApiError(401, "Utilisateur introuvable.");
  }
  if (user.statut === "inactif") {
    throw new ApiError(
      403,
      "Ce compte a été désactivé. Contactez votre administrateur.",
    );
  }

  req.user = user;
  next();
});

module.exports = { protect };
