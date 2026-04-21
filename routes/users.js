var express = require('express');
var router = express.Router();
const verifyToken = require('./auth');
const User = require('../models/user');

const controller = require('../controllers/UsersController')

router.post('/sign-up', controller.signUp);
router.post('/sign-in', controller.signIn);
router.post('/sign-out', controller.signOut);

router.get('/me', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.currentUser.id).select('name email login');
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
});

module.exports = router;
