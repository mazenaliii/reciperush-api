<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post('/verify-token', (req, res) => {
  const { Token } = req.body;
  try {
    const decoded = jwt.verify(Token, process.env.JWT_SECRET);
    req.user = decoded
    res.json({ isValid: true, userInfo: req.user },).status(200);
  } catch (error) {
    res.json({ isValid: false }).status(401)
    console.log(error, 'Unauthorized')
  }
});

module.exports = router

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get('/verify-token', (req, res) => {
    const token = req.headers["authorization"].split(' ')[1];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      res.json({ isValid: true }).status(200);
      console.log('authorized')
    } catch (error) {
      res.json({ isValid: false }).status(401)
      console.log(error, 'unauthorized')
    }
  });

  module.exports = router
>>>>>>> 7ac540cd5ea224c7d6586b2dce3634c42b7e52be
