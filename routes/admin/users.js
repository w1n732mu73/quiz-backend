var express = require('express');
var router = express.Router();

const controller = require('../../controllers/admin/UsersController')

router.get('/', controller.index);

module.exports = router;