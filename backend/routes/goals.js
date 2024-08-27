const express = require('express');
const Goal = require('../models/Goal');

const router = express.Router();

// POST request to add a new goal
router.post('/add', async (req, res) => {
    const newGoal = new Goal(req.body);
    try {
        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
