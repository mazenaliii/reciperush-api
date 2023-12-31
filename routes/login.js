const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select("+password")
      .lean();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ errMessage: "Invalid email or password" });
    }

    const token = jwt.sign({
      userId: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
    }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({ succesMessage: "Logged in successfully. Welcome back!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errMessage: "Failed to login user. Server error." });
  }
});

module.exports = router;
