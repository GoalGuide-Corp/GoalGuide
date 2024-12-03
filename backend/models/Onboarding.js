const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number, required: true },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Non-binary', 'Prefer not to answer'], 
        required: true 
    },
    routineSatisfaction: { 
        type: Number, 
        required: true, 
        min: 1,  // Ensure the number is at least 1
        max: 10, // Ensure the number is no greater than 10
    },
    supportAreas: [{ type: String, required: true }] // Array to store multiple areas of support
});

module.exports = mongoose.model('Onboarding', onboardingSchema);
