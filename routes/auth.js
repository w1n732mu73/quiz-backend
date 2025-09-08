const jwt = require("jsonwebtoken");
const User = require("../models/user");
// import User from "../../models/user.js";

const verifyToken = (req, res, next) => {
  try{
    const cookieToken = req.cookies.token;
    console.log('Cookie token:', cookieToken);
    const authHeader = req.headers['authorization'];
    const headerToken = authHeader && authHeader.split(' ')[1];
    const token = headerToken || cookieToken;
    if (!token) { return res.status(401).json({ error: 'Unauthorized' });
  }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
       if (err) { return res.status(401).json({ error: 'Unauthorized' });
      } req.currentUser = decoded; next(); });
    } catch (error){ return res.status(401).json({message:"Invalid token"})
  }
 };

    module.exports = verifyToken;
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");
// // import jwt from 'jsonwebtoken';


// const verifyToken = async (req, res, next) => {
//   try {
//     const cookieToken = req.cookies.token;
//     console.log('Cookie token:', cookieToken);
//     const authHeader = req.headers['authorization'];
//     console.log('Auth header:', authHeader);

//     const headerToken = authHeader && authHeader.split(' ')[1];
//     console.log('Header token:', headerToken);
//     const token = headerToken || cookieToken;

//     console.log('Using token:', token);
//     console.log('trying to find token')

//     if (!token) {
//       console.log('No token')
//       return res.status(401).json({ error: 'Unauthorized: No token' });

//     }


//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
//       if (err) {
//         console.log('3')
//         return res.status(401).json({ error: 'Unauthorized' });
//       }

//       try {
//         const user = await User.findById(decoded.id).select("-password");
//         if (!user) {
//           console.log('4')
//           return res.status(404).json({ error: "User not found" });
//         }

//         req.currentUser = user;
//         next();

//       }
//       catch (dbErr) {
//         res.status(500).json({ error: 'Server error' });
//       }
//     });

//   } catch (error) {

//     console.log('5')
//     return res.status(401).json({ message: "Invalid token" });

//   }
// };

// module.exports = verifyToken;
