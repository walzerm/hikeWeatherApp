var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res){
	request('http://api.openweathermap.org/data/2.5/weather?zip=94040,us&APPID='+process.env['WEATHER_API_KEY'], function (error, response, body){
		console.log('*************');
		if(!error){
			res.send(weather);
		}
		else{
			console.log(error);
			res.send(error);
		}
	});
});


module.exports = router;