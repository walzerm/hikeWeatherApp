var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
var validator = require('../src/validator');
var users = require('../mockupData/mockUpUsers').users;

// oAuth With facebook
router.get('/facebook',
	passport.authenticate('facebook')
);

router.get('/facebook/callback',
  	passport.authenticate('facebook', { failureRedirect: '/login' }),
  	function(req, res) {
    // Successful authentication, redirect home.
    /*
    	check if user in db already using fb_id
    	if user is in db, return the user_id 
    	redirect to users/user_id
    	else
    	create new user (add to db)
    	redirect to users/user_id
    */

    // change 1 to user ID

    console.log('*******************');
    console.log(req.user);
    res.redirect('/users/1');
});

router.get('/logout', function(req, res){
  	req.logout();
  	res.redirect('/');
});

// regular authentication
// sign up
router.get('/signup', function(req, res){
	res.render('signup/signup', {
		errorMessage:""
	});
});

router.post('/signup', function(req, res){
	
	var errormessages = [];
    errormessages = validator.error(req.body);

    if(errormessages.length > 0){
        res.render('signup/signup', {
        	errorMessage: "Email And password combination is invalid"});
    }
    else{
    	/* 
		1 - find  user in db
		2 - if user is in database, display error message
		3 - else 
		4 - redirect to users/new
		*/
		for(var i = 0; i < users.length; i++){
			if(users[i].email === req.body.email){
				res.send('user already exists');
			}
			else{
				res.redirect('/users/new');
			}
		}
    }
});

//sign in
router.get('/signin', function(req, res, next){
	res.render('signin/signin', {
		errorMessage: ""
	});
});

router.post('/signin', function(req,res){
	
	var errormessages = [];
    errormessages = validator.error(req.body);

    if(errormessages.length > 0){
        res.render('signin/signin', {
        	errorMessage: "Email And password combination is invalid"});
    }
    else{
    	/* 
		1 - find  user in db
		2 - if user is in database,
		3 -  compare the hashed the password using bcrypt
		4 - redirect to users/id
		5 - else, display error
		*/
		for(var i = 0; i < users.length; i++){

		if(users[i].email === req.body.email){

			if(bcrypt.compareSync(users[i].password, req.body.password)){
				res.cookie('userID', 
							req.body.email, 
							{signed: true});

				// res.send('success');
			}
			else{
				res.send('password is wrong');
			}		
		}
		else{
			
				res.send('User doesn\'t exists');
			}
		}
	}

});

//sign out
router.get('/signout', function(req, res) {
	/*
	1 - clear cookie
	2 - redirect to index page
	*/
    res.clearCookie('userID');
    res.redirect('/signin');
});




module.exports = router;