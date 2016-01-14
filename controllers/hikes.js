var express = require('express');
var router = express.Router();
var validator  = require('../src/validator');

router.get('/', function(req, res, next){
	res.render('search/search', {currentWeather:""});
});

router.post('/', function(req, res, next){
	if(validator.zipCode(req.body.zipcode)){
		console.log(req.body);
		res.cookie('zipcode', req.body.zipcode);
		res.redirect('/weather');
	}
	else{
		res.send('not a valid zipCode');
	}
	
});

module.exports = router;