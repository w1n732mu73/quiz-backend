var express = require('express');
var router = express.Router();

const controller = require('../controllers/UsersController')

router.post('/sign-up', controller.signUp);
router.post('/sign-in', controller.signIn);

module.exports = router;
