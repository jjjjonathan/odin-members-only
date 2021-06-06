const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

exports.getSignUp = (req, res) => {
  res.render('sign-up', { title: 'Sign Up', user: req.user, signUpPage: true });
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

exports.getSignIn = (req, res) => {
  res.render('sign-in', { title: 'Sign In', user: req.user, signInPage: true });
};

exports.postSignIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
});

exports.getSignOut = (req, res) => {
  req.logout();
  res.redirect('/');
};
