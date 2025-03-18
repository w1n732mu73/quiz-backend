const Quiz = require("../models/quiz.js");

module.exports = {
  index: async (req, res) => {
    const quizes = await Quiz.find({}, { _id: 1, name: 1 })
    res.json(quizes)
  }
}