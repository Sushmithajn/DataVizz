const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  id: String,
  name: String,
  uploadDate: Date,
  data: [[mongoose.Schema.Types.Mixed]], // 2D array
  headers: [String],
  size: Number,

  // ✅ Add this line to store who uploaded the file
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: true,
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
