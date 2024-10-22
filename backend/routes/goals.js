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

// GET request to retrieve all goals
router.get('/', async (req, res) => {
    try {
      const goals = await Goal.find();  // Retrieve all goals
      res.status(200).json(goals);      // Send goals as a response
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
