const asyncHandler = require("express-async-handler");
const { getStatsGlobales } = require("../services/stats.service");

// GET /api/statistiques
const getStatistiques = asyncHandler(async (req, res) => {
  const stats = await getStatsGlobales();
  res.json(stats);
});

module.exports = { getStatistiques };
