var express = require('express');
var router = express.Router();
var users = require('../mockupData/mockUpUsers').users;
var knex = require('../db/knex');

// uncomment code here
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
    //console.log(req);
    // console.log(req.signedCookies);
	//  knex('users').where('id', req.signedCookies.userID).first().then(function(user) {
    //      res.render('users/user', {
    //          user: user.name
    //      })
    //  })
    var userID = req.signedCookies.userID;
    // console.log(req.signedCookies);

	if(!res.locals.currentUser){
        console.log('here');
        knex('fav_hikes_lists').where('user_id', req.signedCookies.userID).then(function(lists) {
            res.render('users/user',{
      			user : req.user,
      			photo: req.user.photos[0].value,
                hikes: lists
      			});
        });

	}
	else{
        console.log(req.signedCookies);
        console.log('here instead');
        knex('fav_hikes_lists').where('user_id', userID).then(function(lists) {
            console.log(lists);
    		res.render('users/user',{
      			user : res.locals.currentUser,
      			photo: res.locals.currentUser.photo,
                hikes: lists
      		});
        });
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

	// addUserToDB(req.body, function(user){
	// 				res.cookie('userID',
	// 							req.body.email,
	// 							{signed: true});
	// 				res.send('success');
	// 			});

	// res.send('successfull user insertion');
	console.log('**********');
	console.log(req.body);
	res.redirect('/users');
});


function addUserToDB(user, callback){
	users.push({
					email: user.email,
					password: bcrypt.hashSync(user.password,8)
				});

	callback(user);
}

module.exports = router;
