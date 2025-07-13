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


// routes/files.js or routes/upload.js
const File = require('../models/File.cjs');

router.post('/upload', async (req, res) => {
  try {
    const { id, name, uploadDate, data, headers, size } = req.body;

    const newFile = new File({
      id,
      name,
      uploadDate,
      data,
      headers,
      size,
    });

    await newFile.save();

    // ✅ Log success in terminal
    console.log(`✅ File "${name}" uploaded and saved to database.`);

    res.status(201).json({ message: 'File saved to database.' });
  } catch (error) {
    console.error('❌ Upload failed:', error);
    res.status(500).json({ error: 'Server error while saving file.' });
  }
});



module.exports = router;
