const express = require('express');  // Importing the Express library
const mongoose = require('mongoose');  // Importing the Mongoose library
const app = express();  // Creating an Express application

app.use(express.json());  // Middleware to parse JSON bodies in HTTP requests

// Connecting to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/goaltracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");  // Success message when connected to MongoDB
}).catch(err => console.error("Could not connect to MongoDB...", err));  // Error handling if connection fails

// Setting the port for the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);  // Server startup message
});
