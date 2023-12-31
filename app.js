const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectToDB = require("./database");
const cors = require("cors");
const cookieSession = require("cookie-session");
const User = require("./models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

connectToDB();

// Middlewares (optimized order)
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(cookieSession({ name: "reciperush-session", keys: ["COOKIE_SECRET"], httpOnly: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/api/create-acc", async (req, res) => {
  try {
    // Data validation
    const { email, password, name, username } = req.body;
    if (!email || !password || !name || !username) {
      return res.json({ errMessage: "Please fill in all required fields" }).status(400);
    }

    // Check for existing user
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.json({ errMessage: "User already exists" }).status(400)
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({ email, password: hashedPassword, name, username });
    await newUser.save();

    res.json({ successMessage: "Created account successfully!" }).status(201);
  } catch (error) {
    console.error("Error creating user:", error);
    res.json({ errMessage: "Failed to create user. Please double-check username or email, maybe it's already in use." }).status(500);
  }
});

// Listener
app.listen(PORT, () => {
  console.log(`Successfully launched app at port ${PORT}`);
});
