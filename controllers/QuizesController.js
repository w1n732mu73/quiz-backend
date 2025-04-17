const Quiz = require("../models/quiz.js");
const Question = require("../models/question.js");

module.exports = {
  index: async (req, res) => {
    const quizes = await Quiz.find({}, { _id: 1, name: 1 })
    res.json(quizes)
  },
  show: async (req, res) => {
    const quiz = await Quiz.findOne({ _id: req.params.id})
    const questions = await Question.find({ _id: { $in: quiz.questionIds } })

    res.json({
      id: quiz.id,
      name: quiz.name,
      questions: questions
    })
  }
}