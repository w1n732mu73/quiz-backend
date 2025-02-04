const Quiz = require("../models/quiz.js");

module.exports = {
  index: async (req, res) => {
    const quizes = await Quiz.find({})
    res.json(quizes)
  }
}