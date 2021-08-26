const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'User not found!' }); }
      if (!user.validPassword(password, user.salt, user.hash)) { return done(null, false, { message: 'Wrong password!' }); }
      return done(null, user);
    });
  }
));