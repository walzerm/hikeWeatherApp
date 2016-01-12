var express = require('express');
var router = express.Router();
var hash = require('bcrypt');
var validator = require('../src/validator');

// test if user logged in first before routing to
// user page
// router.use(function(req, res, next){
// 	//if user is not logged in, redirect to index page
// 	if(!res.locals.currentUser){
// 		res.redirect('/');
// 	}
// 	//otherwise, move to the next router
// 	else{
// 		next();
// 	}
// });

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
		3 - else hash password using bcrypt
		4 - insert user in db
		5 - redirect to users/id
		*/
    	res.send('success');
    }
});

// sign in
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
		res.send('success');

    }
});

router.get('/users/:id', function(req, res){
	/*
		find user in data base and send user to the user page
	*/
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