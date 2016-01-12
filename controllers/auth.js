var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/facebook',
	passport.authenticate('facebook')
);

router.get('/facebook/callback',
  	passport.authenticate('facebook', { failureRedirect: '/login' }),
  	function(req, res) {
    // Successful authentication, redirect home.
    	res.redirect('/');
});

router.get('/logout', function(req, res){
  	req.logout();
  	res.redirect('/');
});

module.exports = router;