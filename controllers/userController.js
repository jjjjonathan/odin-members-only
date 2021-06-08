/* eslint-disable comma-dangle */
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user');

exports.getSignUp = (req, res) => {
  res.render('sign-up', {
    title: 'Sign Up',
    user: req.user,
    signUpPage: true,
  });
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

  req.flash(
    'success',
    'Successfully signed up for Members Only! You can now sign in.'
  );
  res.redirect('/sign-in');
};

exports.getSignIn = (req, res) => {
  res.render('sign-in', {
    title: 'Sign In',
    errorMessage: req.flash('error')[0],
    successMessage: req.flash('success')[0],
    user: req.user,
    signInPage: true,
  });
};

exports.postSignIn = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
  failureFlash: 'Invalid username or password.',
  successFlash: 'Successfully signed in!',
});

exports.getSignOut = (req, res) => {
  req.logout();
  req.flash('success', 'Successfully signed out. Come back soon!');
  res.redirect('/');
};

exports.getJoinTheClub = (req, res) => {
  res.render('join-the-club', {
    title: 'Join the club!',
    user: req.user,
    joinTheClubPage: true,
  });
};

exports.postJoinTheClub = async (req, res) => {
  if (!req.user) {
    res.render('join-the-club', {
      title: 'Join the club!',
      user: req.user,
      joinTheClubPage: true,
    });
  }

  const { passcode } = req.body;

  if (passcode !== 'helloFooBarWorld') {
    res.render('join-the-club', {
      title: 'Join the club!',
      user: req.user,
      errorMessage: 'Incorrect passcode! Try again',
      joinTheClubPage: true,
    });
  } else if (req.user.member) {
    res.render('join-the-club', {
      title: 'Join the club!',
      user: req.user,
      errorMessage: 'You already have membership status!',
      joinTheClubPage: true,
    });
  } else {
    const user = await User.findByIdAndUpdate(
      req.user,
      { member: true },
      { new: true }
    );
    req.login(user, () => {
      req.flash('success', "Congratulations, you're now a member!");
      return res.redirect('/');
    });
  }
};
