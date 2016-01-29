var express = require('express');
var router = express.Router();
var users = require('../mockupData/mockUpUsers').users;
var knex = require('../db/knex');


// check if user is logged in with either oAuth or auth
router.use(function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() || res.locals.currentUser) {
  	return next();
  }
  else{

  	  res.redirect('/auth/signin');
  }
});

router.get('/', function(req, res){

	/*
		find user in data base and send user to the user page
	*/

    var userID = req.signedCookies.userID;

	if(!res.locals.currentUser){
        knex('users').where('facebook_id', req.user.id).first().then(function(userPrimary) {
            knex('fav_hikes_lists').where('user_id', userPrimary.id).then(function(lists) {
                res.render('users/user',{
                    user : req.user,
                    photo: req.user.photos[0].value,
                    hikes: lists,
                    description: userPrimary.description
                    });
            });
        })
	}
	else{
        console.log('cookie');
        console.log(req.signedCookies.userID);
        knex('users').where('id', req.signedCookies.userID).first().then(function(userPrimary) {
            knex('fav_hikes_lists').where('user_id', req.signedCookies.userID).then(function(lists) {
                res.render('users/user',{
                    user : res.locals.currentUser,
                    photo: res.locals.currentUser.photo,
                    hikes: lists,
                    description: userPrimary.description
                });
            });
        })
	}

});

// create new user
router.get('/new', function(req, res){
	/*
		success, render create new user form
	*/

	res.render('users/new', {user : res.locals.currentUser});
});

router.post('/', function(req,res){
	/*
		1 - load form to create new user
		2 - hash password using bcrypt
		3 - sign cookie
		4 - insert user in db
		5 -  redirect to '/:id' when successfull
	*/

	console.log('**********');
	console.log(req.body);
	res.redirect('/users');
});

router.get('/description', function(req, res) {

    if (!res.locals.currentUser) {
        knex('users').where('facebook_id', req.user.id).first().then(function(user) {
            res.render('users/description', {user: user});
        })
    } else {
        knex('users').where('id', req.signedCookies.userID).first().then(function(user) {
            res.render('users/description', {user: user});
        })
    }

})

router.post('/edit', function(req, res) {
    knex('users').where('id', req.body.hiddenID).update({description: req.body.description}).then(function() {
        res.redirect('/users');
    });

})

router.post('/favourite', function(req, res) {
    if (!res.locals.currentUser) {
        knex('users').where('facebook_id', req.user.id).first().then(function(userPrimary) {
            knex('fav_hikes_lists').where('user_id', userPrimary.id).first().then(function(lists) {
                knex('hikesinfo').where('name', req.body.hiddenName).first().then(function(hike) {
                    knex('fav_hikes').insert({
                        list_id: lists.id,
                        hike_id: hike.id,
                        hike_url: hike.url
                    }).then(function() {
                        res.redirect('/users');
                    })
                })
            });
        })

    }
})

function addUserToDB(user, callback){
	users.push({
					email: user.email,
					password: bcrypt.hashSync(user.password,8)
				});

	callback(user);
}

module.exports = router;
