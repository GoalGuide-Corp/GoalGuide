// routes/onboarding.js
const express = require('express');
const router = express.Router();
const Onboarding = require('../models/Onboarding');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; 

// Middleware to verify JWT and attach user ID to the request
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.userId = decoded.id;
        next();
    });
};

// Onboarding submission route
router.post('/', authenticate, async (req, res) => {
    const { age, gender, routineSatisfaction, supportAreas } = req.body;

    try {
        // Check if onboarding data for this user already exists
        const existingOnboarding = await Onboarding.findOne({ userId: req.userId });
        if (existingOnboarding) {
            return res.status(400).json({ message: 'Onboarding already completed' });
        }

        // Save onboarding data
        const onboardingData = new Onboarding({
            userId: req.userId,
            age,
            gender,
            routineSatisfaction,
            supportAreas
        });

        await onboardingData.save();
        res.status(201).json({ message: 'Onboarding data saved successfully' });
    } catch (error) {
        console.error('Error saving onboarding data:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router;
