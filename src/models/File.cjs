const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  id: String,
  name: String,
  uploadDate: Date,
  data: [[mongoose.Schema.Types.Mixed]], // 2D array
  headers: [String],
  size: Number,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
