const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    minLength: 5,
    required: true,
    unique: true,
  },
  passwordHash: { type: String, required: true },
  member: { type: Boolean, required: true },
  admin: { type: Boolean, required: false },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);
