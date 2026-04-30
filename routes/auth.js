const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const headerToken = authHeader && authHeader.split(' ')[1];
    const token = headerToken;
    if (!token) { return res.status(401).json({ error: 'Unauthorized' });
  }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
       if (err) { return res.status(401).json({ error: 'Unauthorized' });
      } req.currentUser = decoded; next(); });
  };

    module.exports = verifyToken;

    const jwt = require("jsonwebtoken");
