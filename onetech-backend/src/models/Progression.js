const mongoose = require("mongoose");
const idPlugin = require("../utils/idPlugin");

const progressionSchema = new mongoose.Schema(
  {
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    statut: {
      type: String,
      enum: ["non_commence", "en_cours", "termine"],
      default: "non_commence",
    },
    progression: { type: Number, min: 0, max: 100, default: 0 },
    dateDebut: { type: Date },
    dateCompletion: { type: Date },
  },
  { timestamps: true },
);

// Un utilisateur n'a qu'une seule ligne de progression par module
progressionSchema.index({ utilisateur: 1, module: 1 }, { unique: true });

progressionSchema.plugin(idPlugin);

module.exports = mongoose.model("Progression", progressionSchema);
