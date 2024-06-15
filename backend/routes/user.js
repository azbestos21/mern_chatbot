// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/chat', authMiddleware.authenticationMiddleware, async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: query }],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Routes with authentication middleware
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verify-user', userController.verifyUser);
router.get('/userdetails', authMiddleware.authenticationMiddleware, userController.userdetails);
module.exports = router;
