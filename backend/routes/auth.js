const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key'; 

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Finds user by email
        const user = await User.findOne({ email });
        
        // Checks if user exists and password is valid
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Email or password is invalid' });
        }

        // Generates JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Sends token back to the client
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'An error occurred' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Checks if username is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'This email has already been used to create an account' });
        }

        // Creates a new user and set the password
        const newUser = new User({ email });
        await newUser.setPassword(password);
        await newUser.save();

        // Generates JWT for the new user
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Sends token back to the client
        res.json({ token });
    } catch (error) {
        console.error('Error creating account:', error.message);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
