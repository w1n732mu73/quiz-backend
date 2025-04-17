const Quiz = require("../../models/quiz.js");
const Question = require("../../models/question.js");


module.exports = {
  index: async (req, res) => {
    const quizes = await Quiz.find({}, { _id: 1, name: 1, question_ids: 1 })
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
    const quizQuestions = await Question.find( { _id: { $in: quiz.questionIds } } )
    const allQuestions = await Question.find( { _id: { $nin: quiz.questionIds } })

    res.render('admin/quizes/edit', { quiz, quizQuestions, allQuestions })
  },
  append_question: async (req, res) => {
    const quiz = await Quiz.findOne({ _id: req.params.id })
    const question = await Question.findOne( { _id: req.params.questionId })
    quiz.questionIds.push(question._id)

    quiz.save()

    res.redirect('admin/quizes/edit')
  },

  remove_question: async (req, res) => {
    const quiz = await Quiz.findOne({ _id: req.params.id })
    quiz.questionIds = quiz.questionIds.filter(id => id != req.params.questionId)
    quiz.save()

    res.redirect('admin/quizes/edit')
  },
  update: async (req, res) =>{
    const quiz = await Quiz.findOne({ _id: req.params.id })
    await quiz.updateOne({ name: req.body.name })

    res.redirect('/admin/quizes');
  },
}