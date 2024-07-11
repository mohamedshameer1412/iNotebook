const express = require("express");

// The bcrypt NPM package is a JavaScript implementation of the bcrypt password hashing function that allows you to easily create a hash out of a password string .
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// JSON Web Token(JWT) is an open standard used to share security information between two parties — a client and a server. JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const passport = require('passport');

const JWT_SECRET = "shameer$oy";


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }), async (req, res) => {
  try {
    const { user } = req;
    const data = {
      user: {
        id: user.id,
      },
    };
    // Generate JWT token
    const authtoken = jwt.sign( data, JWT_SECRET, { expiresIn: '1h' });

    // Redirect with token as a query parameter
    res.redirect(`http://localhost:3000?authtoken=${authtoken}`);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// exports.verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).send('Access Denied');
//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).send('Invalid Token');
//   }
// };

module.exports = router;


