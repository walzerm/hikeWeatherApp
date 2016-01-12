var express = require('express');
var router = express.Router();

// test if user logged in first before routing to
// user page
router.use(function(req, req, next){
	//if user is not logged in, redirect to index page
	if(!res.locals.currentUser){
		res.redirect('/');
	}
	//otherwise, move to the next router
	else{
		next();
	}
});

router.get('/user', function(req, res, next){
});

module.exports = router;