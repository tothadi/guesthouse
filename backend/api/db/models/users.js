const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: [String],
    required: true,
    enum: [
      'admin',
      'godmode',
      'site'
    ]
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
};

userSchema.methods.validPassword = (password, salt, userhash) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return userhash === hash;
};

userSchema.methods.generateJwt = (user) => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    username: user.username,
    role: user.role,
    exp: parseInt(expiry.getTime() / 1000),
  },
    process.env.JWT_SECRET,
    //{ algorithm: 'RS256' }
  );
};

mongoose.model('User', userSchema);
