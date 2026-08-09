const asyncHandler = require("express-async-handler");
const Module = require("../models/Module");
const Progression = require("../models/Progression");
const Attestation = require("../models/Attestation");
const ApiError = require("../utils/ApiError");
const { genererPdfAttestation } = require("../services/attestation.service");
const { signataires } = require("../config/env");

// GET /api/attestations — liste des modules terminés par l'utilisateur connecté
const getMesAttestations = asyncHandler(async (req, res) => {
  const progressions = await Progression.find({
    utilisateur: req.user._id,
    statut: "termine",
  }).populate("module");
  res.json(progressions.map((p) => p.module));
});

// GET /api/attestations/:moduleId/pdf — génère et renvoie le PDF (Content-Disposition: attachment)
const telechargerAttestation = asyncHandler(async (req, res) => {
  const { moduleId } = req.params;

  const progression = await Progression.findOne({
    utilisateur: req.user._id,
    module: moduleId,
    statut: "termine",
  });
  if (!progression) {
    throw new ApiError(
      403,
      "Ce module n'est pas encore terminé : aucune attestation disponible.",
    );
  }

  const module = await Module.findById(moduleId);
  if (!module) throw new ApiError(404, "Module introuvable.");

  const numero = `OTBS-${module._id.toString().slice(-6).toUpperCase()}-${new Date().getFullYear()}`;

  // Journalisation (traçabilité ISO 9001 / ISO 27001)
  await Attestation.findOneAndUpdate(
    { utilisateur: req.user._id, module: module._id },
    {
      numero,
      utilisateur: req.user._id,
      module: module._id,
      signataireDRH: signataires.drh,
      signataireDG: signataires.directeurGeneral,
      dateGeneration: new Date(),
    },
    { upsert: true },
  );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="attestation-${module._id}.pdf"`,
  );

  genererPdfAttestation({ utilisateur: req.user, module, numero }, res);
});

module.exports = { getMesAttestations, telechargerAttestation };
