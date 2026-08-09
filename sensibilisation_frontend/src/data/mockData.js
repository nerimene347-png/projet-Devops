// Données simulées — seront remplacées par des appels au backend (voir src/services/api.js)

export const modules = [
  {
    id: "m1",
    titre: "Introduction à la norme ISO 9001",
    categorie: "ISO 9001",
    type: "e-learning",
    duree: "25 min",
    progression: 100,
    statut: "termine",
    description:
      "Comprendre les principes du management de la qualité et les exigences clés de la norme ISO 9001.",
  },
  {
    id: "m2",
    titre: "Les fondamentaux de l'ISO 27001",
    categorie: "ISO 27001",
    type: "e-learning",
    duree: "30 min",
    progression: 60,
    statut: "en_cours",
    description:
      "Panorama du système de management de la sécurité de l'information (SMSI) et de ses objectifs.",
  },
  {
    id: "m3",
    titre: "Reconnaître une tentative de phishing",
    categorie: "Sécurité SSI",
    type: "video",
    duree: "12 min",
    progression: 0,
    statut: "non_commence",
    description:
      "Vidéo pratique pour identifier les emails frauduleux et adopter les bons réflexes.",
  },
  {
    id: "m4",
    titre: "Bonnes pratiques : gestion des mots de passe",
    categorie: "Sécurité SSI",
    type: "bonne_pratique",
    duree: "8 min",
    progression: 0,
    statut: "non_commence",
    description:
      "Règles essentielles pour créer et gérer des mots de passe robustes.",
  },
  {
    id: "m5",
    titre: "Processus de traitement des non-conformités",
    categorie: "ISO 9001",
    type: "e-learning",
    duree: "20 min",
    progression: 40,
    statut: "en_cours",
    description:
      "Comment identifier, déclarer et traiter une non-conformité selon la norme ISO 9001.",
  },
  {
    id: "m6",
    titre: "Classification et protection des données",
    categorie: "ISO 27001",
    type: "video",
    duree: "15 min",
    progression: 0,
    statut: "non_commence",
    description:
      "Apprendre à classifier l'information selon sa sensibilité et à appliquer les mesures adaptées.",
  },
];

export const quizzes = [
  {
    id: "q1",
    moduleId: "m2",
    titre: "Quiz — Fondamentaux ISO 27001",
    nbQuestions: 8,
    dureeMin: 10,
    seuilReussite: 70,
    questions: [
      {
        id: "q1-1",
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
        id: "q1-2",
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
        id: "q1-3",
        question:
          "Un email suspect demandant vos identifiants est un exemple de :",
        choix: ["Ransomware", "Phishing", "Firewall", "Backup"],
        bonneReponse: 1,
      },
    ],
  },
];

export const ROLES = [
  "Administrateur",
  "Directeur Général",
  "DRH",
  "Responsable IT",
  "Manager Qualité",
  "RSSI",
  "Collaborateur",
];

export const utilisateurs = [
  {
    id: "u1",
    nom: "Sarra Ben Ali",
    email: "sarra.benali@onetechbs.com",
    role: "Collaborateur",
    departement: "Production",
    progression: 80,
    statut: "actif",
  },
  {
    id: "u2",
    nom: "Karim Trabelsi",
    email: "karim.trabelsi@onetechbs.com",
    role: "Manager Qualité",
    departement: "Qualité",
    progression: 100,
    statut: "actif",
  },
  {
    id: "u3",
    nom: "Ines Chaari",
    email: "ines.chaari@onetechbs.com",
    role: "Responsable IT",
    departement: "IT",
    progression: 45,
    statut: "actif",
  },
  {
    id: "u4",
    nom: "Mohamed Gharbi",
    email: "mohamed.gharbi@onetechbs.com",
    role: "RSSI",
    departement: "Sécurité SSI",
    progression: 100,
    statut: "actif",
  },
  {
    id: "u5",
    nom: "Amira Nasri",
    email: "amira.nasri@onetechbs.com",
    role: "DRH",
    departement: "RH",
    progression: 100,
    statut: "actif",
  },
  {
    id: "u6",
    nom: "Ahmed Slim",
    email: "ahmed.slim@onetechbs.com",
    role: "Directeur Général",
    departement: "Direction",
    progression: 100,
    statut: "actif",
  },
  {
    id: "u7",
    nom: "Youssef Mejri",
    email: "youssef.mejri@onetechbs.com",
    role: "Administrateur",
    departement: "Direction",
    progression: 100,
    statut: "actif",
  },
];

export const notifications = [
  {
    id: "n1",
    type: "info",
    titre: "Nouveau module publié",
    message: "Le module ISO 27001 a été mis à jour avec de nouveaux contenus.",
    date: "Aujourd'hui",
    lu: false,
  },
  {
    id: "n2",
    type: "alerte",
    titre: "Rappel de quiz",
    message: "Vous avez un quiz à terminer avant vendredi.",
    date: "Hier",
    lu: false,
  },
  {
    id: "n3",
    type: "succes",
    titre: "Formation validée",
    message: "Votre dernière formation a été validée avec succès.",
    date: "Il y a 3 jours",
    lu: true,
  },
];

// Signataires officiels apparaissant sur les attestations générées automatiquement
export const signataires = {
  drh: { nom: "Amira Nasri", fonction: "DRH" },
  directeurGeneral: { nom: "Ahmed Slim", fonction: "Directeur Général" },
};
export const statsGlobales = {
  tauxCompletionGlobal: 68,
  utilisateursActifs: 124,
  modulesPublies: 12,
  quizReussisPourcent: 82,
  progressionParDepartement: [
    { departement: "Production", progression: 72 },
    { departement: "Qualité", progression: 95 },
    { departement: "IT", progression: 58 },
    { departement: "Sécurité SSI", progression: 88 },
    { departement: "RH", progression: 40 },
  ],
  evolutionMensuelle: [
    { mois: "Fév", completions: 12 },
    { mois: "Mar", completions: 19 },
    { mois: "Avr", completions: 24 },
    { mois: "Mai", completions: 31 },
    { mois: "Jun", completions: 28 },
    { mois: "Jul", completions: 40 },
  ],
};

export const utilisateurConnecte = {
  nom: "Sarra Ben Ali",
  role: "Collaborateur",
  departement: "Production",
  avatarInitiales: "SB",
};
