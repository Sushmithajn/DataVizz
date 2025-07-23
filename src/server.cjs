const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


require('dotenv').config();

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth.cjs');
const uploadRoutes = require('./routes/upload.cjs');

// Use them separately
app.use('/api/auth', authRoutes);     // ➜ /api/auth/register/*
app.use('/api/files', uploadRoutes);  // ➜ /api/files/upload


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
