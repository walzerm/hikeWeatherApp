var express = require('express');
var router = express.Router();
var validator  = require('../src/validator');
var request = require('request');

router.get('/', function(req, res, next){
	res.render('search/search', {currentWeather:""});
});

router.post('/', function(req, res, next){
	if(validator.zipCode(req.body.zipcode)){
		res.cookie('zipcode', req.body.zipcode);
		if(req.cookies.zipcode){

			var apiURL = 'http://api.openweathermap.org/data/2.5/weather'
			var WEATHER_API_KEY = process.env['WEATHER_API_KEY'];
			var zipcode = req.cookies.zipcode;

			var url = apiURL+'?zip='+zipcode+',us&APPID='+WEATHER_API_KEY;

			request(url, function (error, response, body){
				var weather = JSON.parse(body);
				console.log(weather);
				if(!error){
					res.render('search/search', {
						currentWeather: weather
					});
				}
				else{
					console.log(error);
					res.send(error);
				}
			});
		}
	}
	else{
		res.send('not a valid zipCode');
	}
	
});

module.exports = router;