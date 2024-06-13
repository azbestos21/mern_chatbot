// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/authMiddleware');

// Routes with authentication middleware
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verify-user', userController.verifyUser);
router.get('/userdetails', authMiddleware.authenticationMiddleware, userController.userdetails);
module.exports = router;
