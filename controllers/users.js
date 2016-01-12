var express = require('express');
var router = express.Router();
var hash = require('bcrypt');

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
	res.render('signup/signup');
});

router.post('/user', function(req, res){
	/* 
	1 - validate email and passowrd
	2 - find  user in db
	3 - if user is in database, display error message
	4 - else hash password using bcrypt
	5 - insert user in db
	6 - redirect to users/id
	7 - else, display error
	*/
});

// sign in
router.get('/signin', function(req, res, next){
	res.render('signin/signin');
});

router.post('/user', function(req,res){
	/* 
	1 - validate email and passowrd
	2 - find  user in db
	3 - if user is in database,
	4 -  compare the hashed the password using bcrypt
	5 - redirect to users/id
	6 - else, display error
	*/
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