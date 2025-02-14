const express = require("express");
const router = express.Router();
const User = require("../models/User");

// User login or register
router.post("/login", async (req, res) => {
  const { userId } = req.body;
  try {
    let user = await User.findOne({ userId });
    if (!user) {
      // Register new user if they don't exist
      user = new User({ userId });
      await user.save();
    }
    res.status(200).json({ success: true, userId });
  } catch (error) {
    res.status(500).json({ success: false, error: "Login failed" });
  }
});
// User registration
router.post("/register", async (req, res) => {
    const { userId } = req.body;
  
    try {
      const existingUser = await User.findOne({ userId });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "User ID already exists" });
      }
  
      const newUser = new User({ userId });
      await newUser.save();
  
      res.status(201).json({ success: true, message: "User registered successfully", userId });
    } catch (error) {
      res.status(500).json({ success: false, error: "Registration failed" });
    }
  });
  

module.exports = router;
