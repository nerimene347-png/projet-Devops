const mongoose = require("mongoose");
const idPlugin = require("../utils/idPlugin");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    choix: {
      type: [String],
      required: true,
      validate: (v) => Array.isArray(v) && v.length >= 2,
    },
    bonneReponse: { type: Number, required: true }, // index dans `choix`
  },
  { _id: true },
);
questionSchema.plugin(idPlugin);

const quizSchema = new mongoose.Schema(
  {
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
    titre: { type: String, required: true },
    dureeMin: { type: Number, default: 10 },
    seuilReussite: { type: Number, default: 70 }, // pourcentage
    questions: { type: [questionSchema], required: true },
  },
  { timestamps: true },
);

quizSchema.virtual("nbQuestions").get(function nbQuestions() {
  return this.questions.length;
});
quizSchema.plugin(idPlugin);

module.exports = mongoose.model("Quiz", quizSchema);
