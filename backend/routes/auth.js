const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Assuming you have a User model
const bcrypt = require('bcrypt');  // For password encryption

// POST: Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // If login is successful, respond with user data (or token if using JWT)
  res.status(200).json({ message: 'Login successful', userId: user._id });
});

module.exports = router;
