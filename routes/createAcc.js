const express = require('express');
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/create-acc' , async (req, res) => {
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
        res.json({ errMessage: "Failed to create user. Please double-check username or email, maybe it's already in use, or it could be a server error." }).status(500);
      }
})

module.exports = router;