const User = require("../models/user.js");

module.exports = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const user = new User({ name, email, password });
      await user.save();
      console.log('User registered:', user);
    } catch (error) {
      console.error('Registration failed:', error.message);
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
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  }
}