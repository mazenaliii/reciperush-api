const express = require("express");
const app = express()
const mongoose = require("mongoose");
const connectToDB = require("./database");
const cors = require("cors");
const cookieSession = require("cookie-session");
const User = require("./models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();
const PORT = process.env.PORT || 8080; 

connectToDB();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "reciperush-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

// Routes
app.post("/api/create-acc", async (req, res) => {
  const { email, password, name, username } = req.body;

  try {
    const existingUser = await User.findOne({ email, username }); 

    if (existingUser) {
      return res.status(400).json({ errorMessage: "User already exists" });
    }

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: password, username, name });
    await newUser.save();

    res.json({ successMessage: "Created account successfully!" }).status(201);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ errorMessage: "Failed to create user" });
  }
});

// Listener
app.listen(PORT, () => {
  console.log(`Successfully launched app at port ${PORT}`);
});
