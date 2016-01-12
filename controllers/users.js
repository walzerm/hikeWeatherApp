var express = require('express');
var router = express.Router();



router.get('/users/:id', function(req, res){
	/*
		1 - check if user logged in
		2 - find user in data base and send user to the user page
	*/
});

module.exports = router;