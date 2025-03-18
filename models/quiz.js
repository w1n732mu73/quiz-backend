const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quizScheme = new Schema(
  {
    name: String,
    question_ids: Array,
  }
);

module.exports = mongoose.model("Quiz", quizScheme, 'quizes');
