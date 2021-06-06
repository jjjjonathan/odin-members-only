const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getSignUp = (req, res) => {
  res.render('sign-up', { title: 'Sign Up' });
};

exports.postSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  const member = false;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    passwordHash,
    member,
  });

  await user.save();

  res.redirect('/sign-in');
};
