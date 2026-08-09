/**
 * Peuple la base MongoDB avec des données de démonstration.
 * Usage : node src/seed/seed.js
 *
 * Remarque : les UTILISATEURS ne sont pas créés ici — ils sont synchronisés
 * automatiquement depuis Active Directory à la première connexion (voir
 * auth.controller.js / login). Ce script ne peuple donc que le contenu.
 */
require("dotenv").config();
const mongoose = require("mongoose");
const { mongoUri } = require("../config/env");
const Module = require("../models/Module");
const Quiz = require("../models/Quiz");
const Notification = require("../models/Notification");

const modulesDemo = [
  {
    titre: "Introduction à la norme ISO 9001",
    categorie: "ISO 9001",
    type: "e-learning",
    duree: "25 min",
    description:
      "Comprendre les principes du management de la qualité et les exigences clés de la norme ISO 9001.",
    ordre: 1,
  },
  {
    titre: "Les fondamentaux de l'ISO 27001",
    categorie: "ISO 27001",
    type: "e-learning",
    duree: "30 min",
    description:
      "Panorama du système de management de la sécurité de l'information (SMSI) et de ses objectifs.",
    ordre: 2,
  },
  {
    titre: "Reconnaître une tentative de phishing",
    categorie: "Sécurité SSI",
    type: "video",
    duree: "12 min",
    description:
      "Vidéo pratique pour identifier les emails frauduleux et adopter les bons réflexes.",
    ordre: 3,
  },
  {
    titre: "Bonnes pratiques : gestion des mots de passe",
    categorie: "Sécurité SSI",
    type: "bonne_pratique",
    duree: "8 min",
    description:
      "Règles essentielles pour créer et gérer des mots de passe robustes.",
    ordre: 4,
  },
  {
    titre: "Processus de traitement des non-conformités",
    categorie: "ISO 9001",
    type: "e-learning",
    duree: "20 min",
    description:
      "Comment identifier, déclarer et traiter une non-conformité selon la norme ISO 9001.",
    ordre: 5,
  },
  {
    titre: "Classification et protection des données",
    categorie: "ISO 27001",
    type: "video",
    duree: "15 min",
    description:
      "Apprendre à classifier l'information selon sa sensibilité et à appliquer les mesures adaptées.",
    ordre: 6,
  },
];

async function seed() {
  await mongoose.connect(mongoUri);
  console.log("Connecté à MongoDB, peuplement en cours...");

  await Module.deleteMany({});
  await Quiz.deleteMany({});
  await Notification.deleteMany({});

  const modules = await Module.insertMany(modulesDemo);
  console.log(`✅ ${modules.length} modules créés`);

  const moduleIso27001 = modules.find((m) =>
    m.titre.includes("fondamentaux de l'ISO 27001"),
  );

  await Quiz.create({
    module: moduleIso27001._id,
    titre: "Quiz — Fondamentaux ISO 27001",
    dureeMin: 10,
    seuilReussite: 70,
    questions: [
      {
        question: "Que signifie l'acronyme SMSI ?",
        choix: [
          "Système de Management de la Sécurité de l'Information",
          "Service de Maintenance des Systèmes Informatiques",
          "Standard Mondial de Sécurité Internet",
          "Système de Mesure et de Suivi Interne",
        ],
        bonneReponse: 0,
      },
      {
        question: "Quel est l'objectif principal de la norme ISO 27001 ?",
        choix: [
          "Améliorer la satisfaction client",
          "Protéger la confidentialité, l'intégrité et la disponibilité de l'information",
          "Réduire les coûts de production",
          "Certifier les fournisseurs",
        ],
        bonneReponse: 1,
      },
      {
        question:
          "Un email suspect demandant vos identifiants est un exemple de :",
        choix: ["Ransomware", "Phishing", "Firewall", "Backup"],
        bonneReponse: 1,
      },
    ],
  });
  console.log("✅ Quiz créé");

  await Notification.insertMany([
    {
      titre: "Nouveau module disponible",
      message:
        "Le module « Classification et protection des données » vient d'être publié.",
      type: "info",
    },
    {
      titre: "Rappel de formation",
      message: "Pensez à terminer vos modules de sensibilisation en cours.",
      type: "alerte",
    },
  ]);
  console.log("✅ Notifications créées");

  console.log("🎉 Peuplement terminé.");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Erreur pendant le peuplement :", err);
  process.exit(1);
});
