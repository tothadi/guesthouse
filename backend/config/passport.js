const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Nem létező felhasználó' }); }
      if (!user.validPassword(password, user.salt, user.hash)) { return done(null, false, { message: 'A jelszó nem megfelelő' }); }
      return done(null, user);
    });
  }
));