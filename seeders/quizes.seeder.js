const { Seeder } = require('mongoose-data-seed');
const Quiz  = require('../models/quiz');

const data = [
  { name: 'Quiz 1', question_ids: [] },
  { name: 'Quiz 2', question_ids: [] },
];

class QuizesSeeder extends Seeder {

  async shouldRun() {
    return Quiz.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Quiz.create(data);
  }
}

module.exports = QuizesSeeder;
