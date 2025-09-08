var express = require('express');
var router = express.Router();
const verifyToken = require('./auth');

const controller = require('../controllers/UsersController')

router.post('/sign-up', controller.signUp);
router.post('/sign-in', controller.signIn);

router.get('/me', verifyToken, (req, res) => {
    console.log("USER:", {user: req.currentUser});
    res.json({user: req.currentUser});
});


module.exports = router;
