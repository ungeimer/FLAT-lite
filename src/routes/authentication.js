const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const { isNotLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
  successRedirect: '/interviews/all',
  failureRedirect: '/signup',
  failureFlash: true
}));


// SINGIN
router.get('/signin',isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
});

router.post('/signin' ,isNotLoggedIn, (req, res, next) => {
  body('username') 
  .notEmpty()
  .withMessage('Ingresa un correo electronico');

  body('password')
      .notEmpty()
      .withMessage('Ingresa una contraseña');
  
  const errors = validationResult(req);

  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/interviews/all',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});



module.exports = router;
