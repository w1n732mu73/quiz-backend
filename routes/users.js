var express = require('express');
var router = express.Router();
const verifyToken = require('./auth');
const User = require('../models/user');

const controller = require('../controllers/UsersController')

router.post('/sign-up', controller.signUp);
router.post('/sign-in', controller.signIn);
router.post('/sign-out', controller.signOut);
router.get('/show-me', verifyToken, controller.showMe);

module.exports = router;
