const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Add any additional fields if necessary, like roles, profile data, etc.
});

// Use the `userSchema` to create the `User` model
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
