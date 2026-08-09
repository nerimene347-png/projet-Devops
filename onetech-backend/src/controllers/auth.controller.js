const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { authenticateWithActiveDirectory } = require("../services/ldap.service");
const { bootstrapAdmins } = require("../config/env");

// POST /api/auth/login  { username, password }
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // 1) L'identité est vérifiée par Active Directory (bind LDAP), pas par une base locale.
  const attributsAD = await authenticateWithActiveDirectory(username, password);

  // 2) Synchronisation avec la base locale (création au premier login, mise à jour sinon).
  let user = await User.findOne({ username: attributsAD.username });

  if (!user) {
    const estAdminBootstrap = bootstrapAdmins.includes(
      attributsAD.username.toLowerCase(),
    );
    user = await User.create({
      username: attributsAD.username,
      nom: attributsAD.nom,
      email: attributsAD.email,
      departement: attributsAD.departement,
      role: estAdminBootstrap ? "Administrateur" : "Collaborateur",
    });
  } else {
    // On garde le rôle applicatif tel quel (géré dans la plateforme), mais on rafraîchit
    // les informations d'annuaire qui peuvent avoir changé (nom, email, département).
    user.nom = attributsAD.nom;
    user.email = attributsAD.email;
    user.departement = attributsAD.departement;
    user.derniereConnexion = new Date();
    await user.save();
  }

  const token = generateToken(user);
  res.json({ token, user: user.toPublicJSON() });
});

// GET /api/auth/me  (protégé)
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user.toPublicJSON());
});

module.exports = { login, getCurrentUser };
