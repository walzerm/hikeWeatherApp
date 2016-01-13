var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res){
	request('http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=7bc6876c34e825a69dd9e494f33d9637', function (error, response, body){
		console.log('*************');
		if(!error){
			res.send(body);
		}
		else{
			console.log(error);
			res.send(error);
		}
	});
});

module.exports = router;