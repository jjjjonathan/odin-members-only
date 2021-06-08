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
  res.render('sign-in', {
    title: 'Sign In',
    errorMessage: req.flash('error')[0],
    user: req.user,
    signInPage: true,
  });
};

exports.postSignIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
  failureFlash: 'Invalid username or password.',
});

exports.getSignOut = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.getJoinTheClub = (req, res) => {
  res.render('join-the-club', {
    title: 'Join the club!',
    user: req.user,
    joinTheClubPage: true,
  });
};
