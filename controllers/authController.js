const { validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');

exports.login = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  User.findOne({username: req.body.username}, (err, user) => {
    if(err) {
      return res.status(500).json({message: 'Database error'});
    }
    if(!user) {
      return res.status(400).json({message: 'Incorrect username or password'});
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!err && isMatch) {
        const expirationDate = new Date(Date.now() + 1000*60*60*24*30);
        const accessToken = jwt.sign({
          id: user._id,
        }, process.env.SECRET, {
          expiresIn: 60*15,
        });

        const refreshToken = jwt.sign({
          id: user._id,
        }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: 60*60*24*30,
        });

        const newRefreshToken = new RefreshToken({
          token: refreshToken,
          expireAt: expirationDate,
        });

        newRefreshToken.save(err => {
          if(err) {
            res.status(500).json({message: 'Database error'});
          } else {
            res.json({
              accessToken,
              refreshToken,
              userId: user._id,
              email: user.email,
            });
          }
        });
      } else {
        res.status(400).json({message: 'Incorrect username or password'});
      }
    });
  });
}

exports.register = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {username, email, password} = req.body;

  User.findOne({
    $or: [
      {username},
      {email}
    ]
  }, (err, user) => {
    if(err) {
      return res.status(500).json({message: 'Database error'});
    }
    if(user) {
      return res.status(400).json({message: 'User with this username or email already exists'});
    }
    User({
      username,
      email,
      password,
    }).save(err => {
      if(err) {
        return res.status(500).json({message: 'Database error'});
      }
      return res.status(201).json({message: 'Account has been created!'});
    })
  });
}

exports.refreshToken = (req, res) => {
  RefreshToken.findOne({token: req.body.token}, (err, token) => {
    if(err) {
      return res.status(500).json({message: 'Database error'});
    }
    if(!token) {
      return res.status(400).json({message: 'Invalid token'});
    }
    jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if(err || !user) {
        return res.status(400).json({message: 'Invalid token'});
      }

      console.log('User', user);

      const expirationDate = new Date(Date.now() + 1000*60*60*24*30);
      const accessToken = jwt.sign({
        id: user.id,
      }, process.env.SECRET, {
        expiresIn: 60*15,
      });
      const refreshToken = jwt.sign({
        id: user.id,
      }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: 60*60*24*30,
      });

      token.token = refreshToken;
      token.expireAt = expirationDate;
      token.save(err => {
        if(err) {
          return res.status(500).json({message: 'Database error'});
        }
        res.json({
          accessToken,
          refreshToken,
          userId: user._id,
          email: user.email,
        });
      });
    });
  });
}

exports.revokeToken = (req, res) => {
  RefreshToken.findOneAndDelete({token: req.body.token}, (err, token) => {
    if(err || !token) {
      res.status(400).json({message: 'Invalid token'});
    } else {
      res.sendStatus(200);
    }
  });
}