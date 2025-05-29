const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    text: String,
    answers: [{ text: String, isCorrect: Boolean }],
    picture: {
      fieldname: String,
      originalname: String,
      encoding: String,
      mimetype: String,
      destination: String,
      filename: String,
      path: String,
      size: Number,
    }
  },
  {
    methods: {
      picturePath() {
        if (!this.picture) return ''

        return `/uploads/${this.picture.filename}`
      },
      pictureUrl() {
        if (!this.picture) return ''
        host = process.env.HOST || 'localhost'
        port = process.env.PORT || '3000'

        return `http://${host}:${port}${this.picturePath()}`
      }
    }
  }
);

module.exports = mongoose.model("Question", questionSchema, 'questions');
