const express = require("express");
const {
  getQuizByModule,
  getQuizById,
  soumettreQuiz,
} = require("../controllers/quiz.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(protect);

router.get("/", getQuizByModule); // ?moduleId=xxx
router.get("/:id", getQuizById);
router.post("/:id/submit", soumettreQuiz);

module.exports = router;
