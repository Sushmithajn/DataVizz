const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.cjs');
const nodemailer = require('nodemailer');
const router = express.Router();

const otpMap = new Map(); // email → otp

// Utility: Send OTP via nodemailer
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER, // e.g., yourapp@gmail.com
      pass: process.env.MAIL_PASS, // App password, not Gmail password
    },
  });

  await transporter.sendMail({
    from: `"DataViz App" <${process.env.MAIL_USER}>`,
    to: email,
    subject: 'Your OTP for DataViz Registration',
    text: `Your OTP is: ${otp}`,
  });
};

// ✅ Step 1: Request OTP
router.post('/register/request-otp', async (req, res) => {
  const { email } = req.body;
  console.log('📧 OTP requested for:', email);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpMap.set(email, otp);

    await sendOTP(email, otp);
    console.log('✅ OTP sent to:', email, 'OTP:', otp);
    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('❌ OTP send error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// ✅ Step 2: Verify OTP and Register
router.post('/register/verify', async (req, res) => {
  const { name, email, password, otp } = req.body;
  console.log('📥 Incoming verification:', { name, email, otp });

  try {
    if (!otpMap.has(email)) {
      console.warn('⚠️ No OTP requested for:', email);
      return res.status(400).json({ message: 'No OTP requested for this email' });
    }

    if (otpMap.get(email) !== otp) {
      console.warn('❌ Invalid OTP for:', email, 'Expected:', otpMap.get(email), 'Received:', otp);
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    otpMap.delete(email);

    console.log('✅ User registered:', email);
    res.json({ message: 'Registration successful' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Registration failed', details: err.message });
  }
});


// 🔐 POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'No account found. Please register.' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Optional: generate JWT (only if using token-based auth)
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email
      },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});




module.exports = router;
