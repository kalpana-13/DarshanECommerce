const express = require('express');
const connectToDB = require('./db');
const app = express();
require('dotenv').config();
const user = require('./models/user');
const cors = require('cors');
const orderRoutes = require('./routes/order'); // Import the order routes

app.use(express.json());
app.use(cors());

// Connect to the database
connectToDB();

// Root route
app.get('/', async (req, res) => {
    res.send("<h1>Welcome to SidNotes backend</h1>");
});

// Authentication routes
app.use('/api/auth', require('./routes/auth.js'));

// Order routes
app.use('/api/order', orderRoutes); // Use the order routes

// Server listening
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
