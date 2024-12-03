const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Hardcoded JWT secret for consistency
const JWT_SECRET = 'S3cur3T0ken#12345$!';
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Email or password is invalid' });
        }

        // Generate JWT and include userId
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Include userId in the response
        res.json({ token, userId: user._id });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'This email is already in use.' });
        }

        const newUser = new User({ email });
        await newUser.setPassword(password);
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userId: newUser._id }); // Return both token and userId
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'An error occurred during registration.' });
    }
});

module.exports = router;
