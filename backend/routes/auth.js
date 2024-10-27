const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Load JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Find user by username
        const user = await User.findOne({ username });
        
        // Check if user exists and password is valid
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Send token back to the client
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
