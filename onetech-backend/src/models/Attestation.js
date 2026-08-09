const mongoose = require("mongoose");
const idPlugin = require("../utils/idPlugin");

const attestationSchema = new mongoose.Schema(
  {
    numero: { type: String, required: true, unique: true }, // ex: OTBS-M1-2026
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
    signataireDRH: { type: String, required: true },
    signataireDG: { type: String, required: true },
    dateGeneration: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

attestationSchema.plugin(idPlugin);

module.exports = mongoose.model("Attestation", attestationSchema);
