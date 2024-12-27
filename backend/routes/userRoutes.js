require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
    const { username,email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        user = new User({ username,email, password:hashedPassword });
        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({msg:'Username and password are required'});
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // If user not found
        if (!user) {
            return res.status(400).json({msg:'Invalid username or password'});
        }

        // Compare the given password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg:'Invalid username or password'});
        }

        // Create JWT token using username and _id
        const token = jwt.sign(
            { username: user.username, _id: user._id },
            process.env.JWT_SECRET,  // Ensure this is set in your .env file
            { expiresIn: '1h' }  // Optional: Set token expiration
        );

        // Send response with the JWT token
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Server error'});
    }
});

module.exports = router;
