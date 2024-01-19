const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password").lean();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({ errMessage: "Invalid email or password" }).status(401);
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: 7 * 24 * 60 * 60 }
    );

    res
      .json({
        successMessage: "Logged in successfully. Welcome back!",
        token,
      })
      .status(200);
  } catch (error) {
    console.error(error);
    res.json({ errMessage: "Failed to login user. Server error." }).status(500);
  }
});

module.exports = router;
