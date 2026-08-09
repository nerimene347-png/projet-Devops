const User = require("../models/User");
const Module = require("../models/Module");
const Progression = require("../models/Progression");
const QuizAttempt = require("../models/QuizAttempt");

async function getStatsGlobales() {
  const [utilisateursActifs, modulesPublies, progressions, tentatives] =
    await Promise.all([
      User.countDocuments({ statut: "actif" }),
      Module.countDocuments({ publie: true }),
      Progression.find().populate("utilisateur", "departement"),
      QuizAttempt.find(),
    ]);

  const tauxCompletionGlobal = progressions.length
    ? Math.round(
        progressions.reduce((sum, p) => sum + p.progression, 0) /
          progressions.length,
      )
    : 0;

  const quizReussisPourcent = tentatives.length
    ? Math.round(
        (tentatives.filter((t) => t.reussi).length / tentatives.length) * 100,
      )
    : 0;

  // Progression moyenne par département
  const parDepartement = {};
  progressions.forEach((p) => {
    const dep = p.utilisateur?.departement || "Non renseigné";
    if (!parDepartement[dep]) parDepartement[dep] = { total: 0, count: 0 };
    parDepartement[dep].total += p.progression;
    parDepartement[dep].count += 1;
  });
  const progressionParDepartement = Object.entries(parDepartement).map(
    ([departement, v]) => ({
      departement,
      progression: Math.round(v.total / v.count),
    }),
  );

  // Évolution mensuelle des complétions (6 derniers mois)
  const maintenant = new Date();
  const moisLabels = [];
  for (let i = 5; i >= 0; i -= 1) {
    const d = new Date(maintenant.getFullYear(), maintenant.getMonth() - i, 1);
    moisLabels.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString("fr-FR", { month: "short" }),
    });
  }
  const completionsParMois = Object.fromEntries(
    moisLabels.map((m) => [m.key, 0]),
  );
  progressions
    .filter((p) => p.statut === "termine" && p.dateCompletion)
    .forEach((p) => {
      const d = new Date(p.dateCompletion);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (key in completionsParMois) completionsParMois[key] += 1;
    });
  const evolutionMensuelle = moisLabels.map((m) => ({
    mois: m.label,
    completions: completionsParMois[m.key],
  }));

  return {
    tauxCompletionGlobal,
    utilisateursActifs,
    modulesPublies,
    quizReussisPourcent,
    progressionParDepartement,
    evolutionMensuelle,
  };
}

module.exports = { getStatsGlobales };
