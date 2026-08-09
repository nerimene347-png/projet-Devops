const mongoose = require("mongoose");
const idPlugin = require("../utils/idPlugin");

const moduleSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    categorie: {
      type: String,
      enum: ["ISO 9001", "ISO 27001", "Sécurité SSI"],
      required: true,
    },
    type: {
      type: String,
      enum: ["e-learning", "video", "bonne_pratique"],
      required: true,
    },
    duree: { type: String, required: true }, // ex: "25 min"
    contenuUrl: { type: String, default: "" }, // URL vidéo / support de cours
    publie: { type: Boolean, default: true },
    ordre: { type: Number, default: 0 },
  },
  { timestamps: true },
);

moduleSchema.plugin(idPlugin);

module.exports = mongoose.model("Module", moduleSchema);
