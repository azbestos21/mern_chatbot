const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const bodyParser = require('body-parser'); 

dotenv.config();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
console.log(genAI); // Inspect the methods

// Initialize the Generative Model
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
console.log(model);

// Middleware to parse JSON bodies
router.use(bodyParser.json());

router.post('/chat', async (req, res) => {
  try {
    const { query } = req.body;
    console.log(query);
    if (!query) {
      console.error('Query is required');
      return res.status(400).json({ message: 'Query is required' });
    }

    // Generate a response using Google Generative AI with a token limit
    const chat = model.startChat({
      history: []  // Initialize with empty history or add existing history if needed
    });

    // Adjust the token limit if the API supports it directly
    const result = await chat.sendMessage(query, { maxTokens: 100 });
    const response = await result.response;

    // Check if the response has the expected structure
    if (!response || !response.text) {
      console.error('Unexpected response structure', response);
      return res.status(500).json({ message: 'Error processing the response from AI' });
    }

    // Limit the tokens to 100
    const text = await response.text();
    const limitedText = text.length > 100 ? text.substring(0, 100) : text;

    res.status(200).json({ answer: limitedText });
  } catch (err) {
    console.error('Internal Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Routes with authentication middleware
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verify-user', userController.verifyUser);
router.get('/userdetails', authMiddleware.authenticationMiddleware, userController.userdetails);

module.exports = router;
