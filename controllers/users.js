var express = require('express');
var router = express.Router();

// check if user is logged in with either oAuth or auth
router.use(function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() || res.locals.currentUser) { 
  	return next(); 
  }
  else{

  	  res.redirect('/auth/signin');
  }
});

router.get('/users/:id', function(req, res){
	/*
		find user in data base and send user to the user page
	*/
	res.render('sucess, user is logged in');
});

module.exports = router;