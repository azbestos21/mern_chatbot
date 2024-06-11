// app.js
const express = require('express');
const connectDB = require('./db/connect'); // Adjust the path if connect.js is in a different directory
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
