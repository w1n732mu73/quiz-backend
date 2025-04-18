const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    text: String,
    answers: [{ text: String, isCorrect: Boolean }],
  }
);

module.exports = mongoose.model("Question", questionSchema, 'questions');
