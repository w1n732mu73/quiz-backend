const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const user = new User({ name, email, password });
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.sendStatus(201)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.sendStatus(200)
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}