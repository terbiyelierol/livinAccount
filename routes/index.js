var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'LivinAccount'});
});


router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'],
  prompt : "select_account" }// This will force the user to select an account 
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/main',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;