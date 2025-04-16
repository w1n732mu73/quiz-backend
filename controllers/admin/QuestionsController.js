const Question = require("../../models/question.js");

module.exports = {
  index: async (req, res) => {
    const questions = await Question.find({}, { _id: 1, text: 1, answers: 1 })

    res.render('admin/questions/index', { questions: questions })
  },
  show: async (req, res) =>{
    const question = await Question.findOne({ _id: req.params.id })

    res.render('admin/questions/show', { question: question })
  },
  new: async (req, res) => {
    res.render('admin/questions/new')
  },
  search: async (req, res) => {
    const pattern = req.query.q

    const questions = await Question.find( { name: { $regex: new RegExp(pattern, 'i')} }, { _id: 1, text: 1 });

    res.json(questions);
  },
  create: async (req, res) => {
    await Question.create(
      {
        text: req.body.text,
        answers: [
          { text: req.body.answer1 || '', isCorrect: Number(req.body.isCorrect) == 0  },
          { text: req.body.answer2 || '', isCorrect: Number(req.body.isCorrect) == 1  },
          { text: req.body.answer3 || '', isCorrect: Number(req.body.isCorrect) == 2  },
          { text: req.body.answer4 || '', isCorrect: Number(req.body.isCorrect) == 3  },
        ]
      }
    )

    res.redirect('/admin/questions');
  },
  destroy: async (req, res) => {
    await Question.deleteOne({ _id: req.params.id })

    res.sendStatus(200)
  },
}