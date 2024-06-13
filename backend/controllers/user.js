// controllers/userController.js
const User = require('../modals/user'); // Assuming your user model is defined in models/user.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');

// Get user details based on username extracted from req.user
exports.userdetails = async (req, res) => {
  try {
    const username = req.user;
    console.log(username);
    // Fetch user details from the database based on the username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract name and email from the user object
    const { email } = user;

    // Send the name and email in JSON response
    res.status(200).json({ username, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// User Registration
exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const verificationToken = crypto.randomBytes(20).toString('hex');

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'That email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verified: false,
    });

    await newUser.save();

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SECRET_EMAIL,
        pass: process.env.SECRET_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SECRET_EMAIL,
      to: email,
      subject: 'Account Verification',
      html: `<p>Please verify your account by clicking the link below:</p>
             <a href="http://localhost:3000/verify-user?token=${verificationToken}">Verify Account</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to send verification email' });
      }
      res.status(200).json({ message: 'User registered, check your email for verification' });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    //console.log(req.body);
  
    try {
      const user = await User.findOne({ username: username });
  
      if (!user) {
        return res.status(401).json({ message: "Username or password is incorrect" });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Username or password is incorrect" });
      }
  
      if (!user.verified) {
        return res.status(401).json({ message: "Account not verified. Please check your email for verification." });
      }
  
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

// Verify User
exports.verifyUser = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.verified = true;
    user.verificationToken = null;

    await user.save();

    res.status(200).json({ message: 'Account verified successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

