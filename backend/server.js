require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: '*' }));

// Parse JSON bodies
app.use(express.json());

// Hardcoded MongoDB URI for development
const MONGODB_URI = 'mongodb://localhost:27017/goaltracker';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => console.error('Could not connect to MongoDB...', err));

// Import and use routes
const goalsRouter = require('./routes/goals');
app.use('/goals', goalsRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const onboardingRouter = require('./routes/onboarding');
app.use('/onboarding', onboardingRouter);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
