var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res){
	if(req.cookies.zipcode){
		var url = 'http://api.openweathermap.org/data/2.5/weather?zip='+req.cookies.zipcode+',us&APPID='+process.env['WEATHER_API_KEY'];

		request(url, function (error, response, body){
			var weather = body;

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
	
});


module.exports = router;