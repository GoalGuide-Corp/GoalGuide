// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Optional, only if needed for cross-origin requests

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: '*' })); // Explicitly allow all origins for testing

// Parse JSON bodies
app.use(express.json());

// Connecting to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goaltracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => console.error("Could not connect to MongoDB...", err));

// Import and use routes
const goalsRouter = require('./routes/goals');
app.use('/goals', goalsRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const onboardingRouter = require('./routes/onboarding');  // Add onboarding router
app.use('/onboarding', onboardingRouter);                 // Add onboarding route

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
