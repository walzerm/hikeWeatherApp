var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
var validator = require('../src/validator');
var users = require('../mockupData/mockUpUsers').users;
var knex = require('../db/knex');

// oAuth With facebook
//Facebook users will not have an email stored
router.get('/facebook',
	passport.authenticate('facebook')
);

router.get('/facebook/callback',
  	passport.authenticate('facebook', { failureRedirect: '/login' }),
  	function(req, res) {
        knex('users').where('facebook_id', req.user.id).first().then(function(user) {
            if (!user) {
                knex('users').insert({
                    name: req.user.displayName,
                    facebook_id: req.user.id
                }).then(function() {
                    res.redirect('/users');
                })
            } else {
                res.redirect('/users');
            }
        })
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
    } else{
        knex('users').where('email', req.body.email).first().then(function(user) {
            if (!user) {
                var hash = bcrypt.hashSync(req.body.password, 8);
                knex('users').insert({
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password: hash
                }).then(function() {
                    res.redirect('/users');
                })

            } else {
                res.send('user already exists');
            }
        })
    	/*
		1 - find  user in db
		2 - if user is in database, display error message
		3 - else
		4 - redirect to users/new
		*/
		// for(var i = 0; i < users.length; i++){
		// 	if(users[i].email === req.body.email){
		// 		res.send('user already exists');
		// 	}
		// 	else{
		// 		res.redirect('/users/new');
		// 	}
		// }
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
    console.log(req.body);

    if(errormessages.length > 0){
        res.render('signin/signin', {
        	errorMessage: "Shit ain't working, yo! Try again."});
    } else {
        knex('users').where('email', req.body.email.toLowerCase()).first().then(function(user) {
            //console.log(user);
            if (!user) {
                console.log('not a user');
                res.render('signin/signin', {
                	errorMessage: "Shit ain't working, yo! Try again."});
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    console.log('redirecting yo');
                    console.log(user.id);
                    res.cookie('userID', user.id, { signed: true });
                    console.log(req.signedCookies);
                    res.redirect('/users');
                } else {
                    res.render('signin/signin', {
                    	errorMessage: "Shit ain't working, yo! Try again."});
                }
            }
        })
    	/*
		1 - find  user in db
		2 - if user is in database,
		3 -  compare the hashed the password using bcrypt
		4 - redirect to users/id
		5 - else, display error
		*/
		// for(var i = 0; i < users.length; i++){
        //
		// 	if(users[i].email === req.body.email){
        //
		// 		if(bcrypt.compareSync(req.body.password, users[i].password)){
		// 			res.cookie('userID',
		// 						req.body.email,
		// 						{signed: true});
		// 			res.cookie('displayName',
		// 						"Lissa Walzed",
		// 						{signed: true});
		// 			res.cookie('photo',
		// 						"",
		// 						{signed: true});
        //
		// 			res.cookie('user', {
		// 				displayName:'Lissa walzer',
		// 				photo:""});
        //
		// 			return res.redirect('/users');
		// 		}
		// 		else{
		// 			 return res.send('password is wrong');
        //
		// 		}
        //
		// 	}
		// }

		//res.send('User doesn\'t exists');
	}

});

//sign out
router.get('/signout', function(req, res) {
	/*
	1 - clear cookie
	2 - redirect to index page
	*/
    req.logout();
    res.clearCookie('userID');
    res.clearCookie('user');
    res.redirect('/auth/signin');
});


module.exports = router;
