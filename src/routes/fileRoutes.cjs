const express = require('express');
const router = express.Router(); // ✅ You must add this line
const mongoose = require('mongoose');
const File = require('../models/File.cjs');

// Helper to check if the ID is valid
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// fileRoutes.cjs
router.delete('/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const deletedFile = await File.findOneAndDelete({ id: fileId });

    if (!deletedFile) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Error deleting file' });
  }
});

module.exports = router;
