const mongoose = require("mongoose");
require('dotenv').config()

const mongoURL = process.env.MONGO_URL;
const QuizesSeeder = require('./seeders/quizes.seeder')

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
QuizesSeeder,
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports = { seedersList, connect, dropdb }
