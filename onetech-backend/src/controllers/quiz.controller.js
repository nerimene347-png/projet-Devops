const asyncHandler = require("express-async-handler");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const Progression = require("../models/Progression");
const ApiError = require("../utils/ApiError");

// GET /api/quizzes?moduleId=xxx
const getQuizByModule = asyncHandler(async (req, res) => {
  const { moduleId } = req.query;
  if (!moduleId) throw new ApiError(400, "Le paramètre moduleId est requis.");

  const quiz = await Quiz.findOne({ module: moduleId });
  if (!quiz) throw new ApiError(404, "Aucun quiz associé à ce module.");
  res.json(quiz);
});

// GET /api/quizzes/:id
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) throw new ApiError(404, "Quiz introuvable.");
  res.json(quiz);
});

// POST /api/quizzes/:id/submit  { reponses: { questionId: indexChoisi } }
const soumettreQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) throw new ApiError(404, "Quiz introuvable.");

  const { reponses = {} } = req.body;

  let bonnesReponses = 0;
  quiz.questions.forEach((q) => {
    if (reponses[q._id.toString()] === q.bonneReponse) bonnesReponses += 1;
  });
  const score = Math.round((bonnesReponses / quiz.questions.length) * 100);
  const reussi = score >= quiz.seuilReussite;

  const attempt = await QuizAttempt.create({
    utilisateur: req.user._id,
    quiz: quiz._id,
    reponses,
    score,
    reussi,
  });

  // Si réussi, on marque le module comme terminé dans le suivi de progression.
  if (reussi) {
    await Progression.findOneAndUpdate(
      { utilisateur: req.user._id, module: quiz.module },
      {
        $set: {
          statut: "termine",
          progression: 100,
          dateCompletion: new Date(),
        },
      },
      { upsert: true },
    );
  }

  res.status(201).json({ score, reussi, tentative: attempt._id });
});

module.exports = { getQuizByModule, getQuizById, soumettreQuiz };
