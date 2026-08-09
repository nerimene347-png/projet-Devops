const ApiError = require("../utils/ApiError");

/**
 * Autorise l'accès uniquement aux utilisateurs ayant l'un des rôles listés.
 * Utilisation : router.get("/utilisateurs", protect, requireRole("Administrateur", "DRH"), ...)
 */
function requireRole(...rolesAutorises) {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentification requise.");
    }
    if (!rolesAutorises.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Accès refusé. Rôle requis : ${rolesAutorises.join(" ou ")}.`,
      );
    }
    next();
  };
}

module.exports = { requireRole };
