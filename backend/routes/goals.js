const express = require('express');
const mongoose = require('mongoose'); // Add mongoose if you're using ObjectId
const Goal = require('../models/Goal');

const router = express.Router();

// Add a new goal
router.post('/add', async (req, res) => {
    const { userId, title, type, deadline, frequency, notes } = req.body;

    if (!userId || !title || !type || !deadline || !frequency) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    try {
        // Convert userId to ObjectId
        const userIdObjectId = new mongoose.Types.ObjectId(userId);

        const newGoal = new Goal({
            userId: userIdObjectId, // Ensure this is an ObjectId
            title,
            type,
            deadline: new Date(deadline), // Ensure deadline is a valid Date
            frequency,
            notes: notes || '',
        });

        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        console.error('Error saving goal:', error.message);
        res.status(500).json({ message: 'Failed to save goal.', error: error.message });
    }
});

// Retrieve user-specific goals
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Convert userId to ObjectId
        const userIdObjectId = new mongoose.Types.ObjectId(userId);

        const goals = await Goal.find({ userId: userIdObjectId });
        res.status(200).json(goals);
    } catch (error) {
        console.error('Error retrieving goals:', error.message);
        res.status(500).json({ message: 'Failed to retrieve goals.', error: error.message });
    }
});

module.exports = router;
