const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    steps: [{
        description: String,
        completed: Boolean
    }],
    completed: {
        type: Boolean,
        default: false
    }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
