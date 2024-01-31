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