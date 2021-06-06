const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  text: { type: String, minLength: 10, required: true },
  timestamp: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
