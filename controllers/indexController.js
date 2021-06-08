const { body, validationResult } = require('express-validator');

const Message = require('../models/message');

exports.getIndex = async (req, res) => {
  const messages = await Message.find({})
    .sort({ timestamp: 'desc' })
    .populate('user');

  res.render('index', {
    title: 'Messages',
    user: req.user,
    successMessage: req.flash('success')[0],
    messages,
    messagesPage: true,
  });
};

exports.getMessages = (req, res) => {
  res.redirect('/');
};

exports.getAddMessage = (req, res) => {
  res.render('add-message', {
    title: 'Add Message',
    user: req.user,
    addMessagePage: true,
  });
};

exports.postAddMessage = [
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters.')
    .escape(),

  async (req, res) => {
    const errors = validationResult(req);
    const { text } = req.body;
    const { user } = req;
    const timestamp = new Date();

    if (!errors.isEmpty()) {
      // There are validation errors
      const errorArray = errors.errors.map((error) => error.msg);
      res.render('add-message', {
        title: 'Add Message',
        user: req.user,
        errorMessages: errorArray,
        addMessagePage: true,
      });
    } else {
      // No validation errors! Golden
      const message = new Message({ text, user, timestamp });
      await message.save();
      res.redirect('/');
    }
  },
];

exports.getDeleteMessage = async (req, res) => {
  if (!req.user?.admin) {
    res.render('delete-message', {
      title: 'Error',
      user: req.user,
      errorMessage:
        'You must be signed in as an administrator to delete a message.',
    });
  }
  const message = await Message.findById(req.params.id).populate('user');
  res.render('delete-message', {
    title: 'Delete message?',
    user: req.user,
    message,
  });
};

exports.postDeleteMessage = async (req, res) => {
  if (!req.user?.admin) {
    res.render('delete-message', {
      title: 'Error',
      user: req.user,
      errorMessage:
        'You must be signed in as an administrator to delete a message.',
    });
  }

  await Message.findByIdAndDelete(req.params.id);
  req.flash('success', 'Successfully deleted the message!');
  res.redirect('/');
};
