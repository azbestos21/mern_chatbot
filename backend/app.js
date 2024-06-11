const express = require('express');
const connectDB = require('./db/connect'); // Ensure this path is correct
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const cors = require('cors'); // Move this to the top to avoid redeclaration

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Enable CORS for the frontend URL
app.use(cors({
  origin: 'http://localhost:3000', // Update this if your frontend URL is different
  credentials: true,
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
