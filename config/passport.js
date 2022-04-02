const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const config = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.SECRET;
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findOne({_id: jwtPayload.id}, {password: 0}, (err, user) => {
      if(err) return done(err, false);
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }))
}

module.exports = config;