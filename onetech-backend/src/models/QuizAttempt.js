const mongoose = require("mongoose");
const idPlugin = require("../utils/idPlugin");

const quizAttemptSchema = new mongoose.Schema(
  {
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    reponses: { type: Map, of: Number }, // { questionId: indexChoisi }
    score: { type: Number, required: true }, // pourcentage
    reussi: { type: Boolean, required: true },
  },
  { timestamps: true },
);

quizAttemptSchema.plugin(idPlugin);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
