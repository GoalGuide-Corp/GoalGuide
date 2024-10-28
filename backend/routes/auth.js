const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'your_secret_key'; 

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Finds user by username
        const user = await User.findOne({ username });
        
        // Checks if user exists and password is valid
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
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

// Creates Account route
router.post('/create-account', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Checks if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        // Creates a new user and set the password
        const newUser = new User({ username });
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
