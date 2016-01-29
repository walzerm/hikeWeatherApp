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
    }
    else{
        knex('users').where('email', req.body.email).first().then(function(user) {
            console.log(req.body.email);
            console.log(user);
            if (!user) {

                var hash = bcrypt.hashSync(req.body.password, 8);
                knex('users').insert(
                    {name: req.body.name,
                    email:req.body.email.toLowerCase(),
                    password: hash}).returning('id').then(function(id){
                        console.log('I\'m inside insert');
                        console.log(id[0]);
                        res.cookie('user', {
                                displayName: req.body.name,
                                photo: ""
                            });
                            // added signed user ID to cookies

                            res.cookie('userID', id[0], { signed: true });

                            res.redirect('/users');
                    });

                // });

            }
            else {
                res.send('user already exists');
            }
        });
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
            if (!user) {
                res.render('signin/signin', {
                	errorMessage: "Shit ain't working, yo! Try again."});
            }
            else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.cookie('user', {
                        displayName: user.name,
                        photo: ""
                    });
                    res.cookie('userID', user.id, { signed: true });
                    res.redirect('/users');
                } else {
                    res.render('signin/signin', {
                    	errorMessage: "Shit ain't working, yo! Try again."});
                }
            }
        });

	}

});

//sign out
router.get('/signout', function(req, res) {
    req.logout();
    res.clearCookie('userID');
    res.clearCookie('user');
    res.redirect('/auth/signin');
});


module.exports = router;
