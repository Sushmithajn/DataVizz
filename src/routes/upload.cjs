// routes/files.js or routes/upload.js
const express = require('express');
const router = express.Router();
const File = require('../models/File.cjs');
const authenticate = require('../middleware/authenticate.cjs');
const mongoose = require('mongoose');




// Existing POST /upload route
router.post('/upload', authenticate, async (req, res) => {
  try {
    console.log('✅ Received JSON body:', req.body);

    const { id, name, uploadDate, data, headers, size } = req.body;

    const newFile = new File({
      id,
      name,
      uploadDate,
      data,
      headers,
      size,
      userId: new mongoose.Types.ObjectId(req.user.id),
    });

    await newFile.save();
    console.log(`✅ File "${name}" uploaded and saved to database.`);
    res.status(201).json({ message: 'File saved to database.' });
  } catch (error) {
    console.error('❌ Upload failed:', error);
    res.status(500).json({ error: 'Server error while saving file.' });
  }
});



// ✅ NEW: GET /files/all → Return all saved files
router.get('/all', authenticate, async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id }).sort({ uploadDate: -1 });
    res.status(200).json(files);
  } catch (error) {
    console.error('❌ Fetch files failed:', error);
    res.status(500).json({ error: 'Server error while fetching files.' });
  }
});


module.exports = router;
