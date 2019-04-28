const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../model/users');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });
  isRegistered = false;
  isPasswordValid = false;

  if (newUser.password.length < 6) {
    isPasswordValid = false;
  }
  else{
    isPasswordValid = true;
  }

  User.findOne({ email: newUser.email }).then(user => {
    if (user) {
     console.log("already registered");
     isRegistered = true;
    }
    else{
    isRegistered = false;
    }
  }); 

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } 
    else if (!validateEmail(newUser.email)) {
      res.json({success: false, msg:'Invalid Email'});
    }
    else if (isRegistered) {
      res.json({success: false, msg:'User already registered'});
    }
    else if(!isPasswordValid){
      res.json({success: false, msg:'Password Cannot be less than 6 characters'});
    }
    else if(!isRegistered){
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const fullName = req.body.fullName;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
          });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            fullName: user.fullName,
            phone: user.phone,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
