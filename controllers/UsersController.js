const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body
      if (await User.findOne({ email }))
        return res.status(403).json({ error: 'Email has already been taken' })
      const user = new User({ name, email, password });
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.sendStatus(201);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: 'User not found' })

      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return res.status(403).json({ error: 'Invalid email or password' });
      }
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.sendStatus(200);
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  signOut: async (req, res) => {
    try {
      res.clearCookie('token', { httpOnly: true, secure: true });
      res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  showMe: async (req, res) => {
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
  }
}
