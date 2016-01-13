var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res){
	request('api.openweathermap.org/data/2.5/weather?lat=35&lon=139', function (error, response, body){
		console.log(response.body);
	});
});