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
      res.status(201).json({ success: true });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email });
      if (!user) {
        // throw new Error('User not found');
        return res.status(404).json({ error: 'No such user' });
      }

      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        // throw new Error('Invalid password');
        return res.status(403).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  signOut: async (req, res) => {
    try {
      res.clearCookie('token', { httpOnly: true, secure: true });
      res.status(200).json({ success: true, message: "Signed out" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
