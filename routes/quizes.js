var express = require('express');
var router = express.Router();
const verifyToken = require('./auth')

const controller = require('../controllers/QuizesController')

router.get('/', verifyToken, controller.index);
router.get('/:id', verifyToken, controller.show);

module.exports = router;
