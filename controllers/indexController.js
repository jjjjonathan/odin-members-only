const Message = require('../models/message');

exports.getIndex = async (req, res) => {
  const messages = await Message.find({})
    .sort({ timestamp: 'desc' })
    .populate('user');

  res.render('index', {
    title: 'Messages',
    user: req.user,
    messages,
    messagesPage: true,
  });
};

exports.getAddMessage = (req, res) => {
  res.render('add-message', {
    title: 'Add Message',
    user: req.user,
    addMessagePage: true,
  });
};

exports.postAddMessage = async (req, res) => {
  const { text } = req.body;
  const { user } = req;
  const timestamp = new Date();

  const message = new Message({ text, user, timestamp });

  await message.save();

  res.redirect('/');
};
