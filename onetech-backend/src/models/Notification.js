const mongoose = require("mongoose");
const idPlugin = require("../utils/idPlugin");

const notificationSchema = new mongoose.Schema(
  {
    // Si `destinataire` est vide, la notification est diffusée à tous les utilisateurs
    destinataire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    titre: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["info", "alerte", "succes"], default: "info" },
    lu: { type: Boolean, default: false },
  },
  { timestamps: true },
);

notificationSchema.plugin(idPlugin);

module.exports = mongoose.model("Notification", notificationSchema);
