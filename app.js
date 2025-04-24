var createError = require('http-errors');
var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const methodOverride = require('method-override')


var indexRouter = require('./routes/index');
var quizesRouter = require('./routes/quizes');
var usersRouter = require('./routes/users');
var adminDashboardRouter = require('./routes/admin/dashboard')
var adminQuizesRouter = require('./routes/admin/quizes')
var adminQuestionsRouter = require('./routes/admin/questions')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/quizes', quizesRouter);
app.use('/users', usersRouter);
app.use('/admin', adminDashboardRouter);
app.use('/admin/quizes', adminQuizesRouter);
app.use('/admin/questions', adminQuestionsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function main() {
  try{
      await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/quizes');
      console.log("Сервер ожидает подключения...");
  }
  catch(err) {
      return console.log(err);
  }
}

main()

module.exports = app;
