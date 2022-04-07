const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const clothesSchema = require('./Clothes');
const deviceTokenSchema = require('./DeviceToken');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  clothes: [clothesSchema],
  deviceTokens: [deviceTokenSchema],
});

userSchema.pre('save', function(next) {
  if(!this.isNew) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  })
});

userSchema.methods.comparePassword = function(pass, cb) {
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    if(err) return cb(err);
    cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', userSchema, 'users');