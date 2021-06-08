/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { formatDistanceToNow } = require('date-fns');

const MessageSchema = new mongoose.Schema({
  text: { type: String, minLength: 10, required: true },
  timestamp: { type: Date, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

MessageSchema.virtual('timeAgo').get(function timeAgo() {
  return formatDistanceToNow(this.timestamp, { addSuffix: true });
});

MessageSchema.virtual('url').get(function getUrl() {
  return `/messages/${this._id}`;
});

module.exports = mongoose.model('Message', MessageSchema);
