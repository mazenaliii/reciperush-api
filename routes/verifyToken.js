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
