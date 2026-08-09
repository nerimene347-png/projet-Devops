const ApiError = require("../utils/ApiError");

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details || undefined,
    });
  }

  // Erreurs Mongoose (validation, cast d'ObjectId, doublon d'index unique...)
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({
        success: false,
        message: "Données invalides.",
        details: err.errors,
      });
  }
  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ success: false, message: "Identifiant invalide." });
  }
  if (err.code === 11000) {
    return res
      .status(409)
      .json({ success: false, message: "Cette ressource existe déjà." });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  return res
    .status(500)
    .json({ success: false, message: "Erreur interne du serveur." });
}

function notFound(req, res) {
  res
    .status(404)
    .json({
      success: false,
      message: `Route introuvable : ${req.method} ${req.originalUrl}`,
    });
}

module.exports = { errorHandler, notFound };
