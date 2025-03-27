const Quiz = require("../../models/quiz.js");

module.exports = {
  index: async (req, res) => {
    const quizes = await Quiz.find({}, { _id: 1, name: 1 })

    res.render('admin/quizes/index', { quizes: quizes })
  },
  show: async (req, res) =>{
    const quiz = await Quiz.findOne({ _id: req.params.id })

    res.render('admin/quizes/show', { quiz: quiz })
  },
  new: async (req, res) => {
    res.render('admin/quizes/new')
  },
  create: async (req, res) => {
    await Quiz.create({ name: req.body.name })

    res.redirect('/admin/quizes');
  },
  destroy: async (req, res) => {
    await Quiz.deleteOne({ _id: req.params.id })

    res.sendStatus(200)
  },
  edit: async (req, res) =>{
    const quiz = await Quiz.findOne({ _id: req.params.id })

    res.render('admin/quizes/edit', { quiz: quiz })
  },
  update: async (req, res) =>{
    const quiz = await Quiz.findOne({ _id: req.params.id })
    await quiz.updateOne({ name: req.body.name })

    res.redirect('/admin/quizes');
  },
}