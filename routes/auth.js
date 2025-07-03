const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.currentUser = await User.findOne({ _id: decoded.id });
    next();
  });
};

module.exports = verifyToken;