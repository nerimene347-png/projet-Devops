const asyncHandler = require("express-async-handler");
const Module = require("../models/Module");
const Progression = require("../models/Progression");
const ApiError = require("../utils/ApiError");

// Fusionne chaque module avec la progression de l'utilisateur connecté (si elle existe)
async function attacherProgression(modules, userId) {
  const progressions = await Progression.find({
    utilisateur: userId,
    module: { $in: modules.map((m) => m._id) },
  });
  const parModule = new Map(progressions.map((p) => [p.module.toString(), p]));

  return modules.map((m) => {
    const p = parModule.get(m._id.toString());
    return {
      ...m.toObject(),
      progression: p ? p.progression : 0,
      statut: p ? p.statut : "non_commence",
    };
  });
}

// GET /api/modules
const getModules = asyncHandler(async (req, res) => {
  const modules = await Module.find({ publie: true }).sort({
    ordre: 1,
    createdAt: 1,
  });
  const resultat = await attacherProgression(modules, req.user._id);
  res.json(resultat);
});

// GET /api/modules/:id
const getModuleById = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id);
  if (!module) throw new ApiError(404, "Module introuvable.");
  const [resultat] = await attacherProgression([module], req.user._id);
  res.json(resultat);
});

// PATCH /api/modules/:id/progression  { progression, statut }
const majProgression = asyncHandler(async (req, res) => {
  const { progression, statut } = req.body;
  const module = await Module.findById(req.params.id);
  if (!module) throw new ApiError(404, "Module introuvable.");

  const update = {
    progression,
    statut,
    ...(statut === "termine" ? { dateCompletion: new Date() } : {}),
    ...(statut === "en_cours" ? { dateDebut: new Date() } : {}),
  };

  const doc = await Progression.findOneAndUpdate(
    { utilisateur: req.user._id, module: module._id },
    { $set: update },
    { upsert: true, new: true },
  );
  res.json(doc);
});

// --- Administration des modules (Administrateur / Manager Qualité / RSSI) ---

// POST /api/modules
const creerModule = asyncHandler(async (req, res) => {
  const module = await Module.create(req.body);
  res.status(201).json(module);
});

// PUT /api/modules/:id
const modifierModule = asyncHandler(async (req, res) => {
  const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!module) throw new ApiError(404, "Module introuvable.");
  res.json(module);
});

// DELETE /api/modules/:id
const supprimerModule = asyncHandler(async (req, res) => {
  const module = await Module.findByIdAndDelete(req.params.id);
  if (!module) throw new ApiError(404, "Module introuvable.");
  res.json({ success: true });
});

module.exports = {
  getModules,
  getModuleById,
  majProgression,
  creerModule,
  modifierModule,
  supprimerModule,
};
