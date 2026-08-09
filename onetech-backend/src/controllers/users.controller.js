const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Progression = require("../models/Progression");
const ApiError = require("../utils/ApiError");
const { ROLES } = require("../models/User");

// GET /api/utilisateurs
const getUtilisateurs = asyncHandler(async (req, res) => {
  const utilisateurs = await User.find().sort({ createdAt: -1 });

  // Progression moyenne (tous modules confondus) par utilisateur, pour l'affichage du tableau.
  const moyennes = await Progression.aggregate([
    { $group: { _id: "$utilisateur", moyenne: { $avg: "$progression" } } },
  ]);
  const moyenneParUtilisateur = new Map(
    moyennes.map((m) => [m._id.toString(), Math.round(m.moyenne)]),
  );

  res.json(
    utilisateurs.map((u) => ({
      ...u.toPublicJSON(),
      progression: moyenneParUtilisateur.get(u._id.toString()) || 0,
    })),
  );
});

// PATCH /api/utilisateurs/:id/role   { role }
// Seul un Administrateur peut changer le rôle applicatif d'un utilisateur.
const changerRole = asyncHandler(async (req, res) => {
  const { role } = req.body;
  if (!ROLES.includes(role)) {
    throw new ApiError(
      400,
      `Rôle invalide. Valeurs autorisées : ${ROLES.join(", ")}`,
    );
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true },
  );
  if (!user) throw new ApiError(404, "Utilisateur introuvable.");
  res.json(user.toPublicJSON());
});

// PATCH /api/utilisateurs/:id/statut   { statut: "actif" | "inactif" }
const changerStatut = asyncHandler(async (req, res) => {
  const { statut } = req.body;
  if (!["actif", "inactif"].includes(statut)) {
    throw new ApiError(400, "Statut invalide (attendu : actif ou inactif).");
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { statut },
    { new: true },
  );
  if (!user) throw new ApiError(404, "Utilisateur introuvable.");
  res.json(user.toPublicJSON());
});

module.exports = { getUtilisateurs, changerRole, changerStatut };
