const mongoose = require("mongoose");

const ROLES = [
  "Administrateur",
  "Directeur Général",
  "DRH",
  "Responsable IT",
  "Manager Qualité",
  "RSSI",
  "Collaborateur",
];

const userSchema = new mongoose.Schema(
  {
    // Identifiant Active Directory (sAMAccountName), unique — c'est la clé de rapprochement
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    nom: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    departement: { type: String, default: "Non renseigné" },

    // Rôle applicatif — n'est PAS lu depuis l'AD directement, il est géré dans la plateforme
    // (un Administrateur peut le modifier via /api/utilisateurs/:id/role). Valeur par défaut
    // à la toute première connexion : "Collaborateur", sauf si listé dans BOOTSTRAP_ADMIN_USERNAMES.
    role: { type: String, enum: ROLES, default: "Collaborateur" },

    statut: { type: String, enum: ["actif", "inactif"], default: "actif" },

    derniereConnexion: { type: Date },
  },
  { timestamps: true },
);

userSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id,
    nom: this.nom,
    email: this.email,
    username: this.username,
    role: this.role,
    departement: this.departement,
    statut: this.statut,
    avatarInitiales: this.nom
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
  };
};

module.exports = mongoose.model("User", userSchema);
module.exports.ROLES = ROLES;
