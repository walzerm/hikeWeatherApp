var express = require('express');
var router = express.Router();
var validator  = require('../src/validator');
var request = require('request');
var knex = require('../db/knex');

var hikes = function(){
	return knex('hikesinfo');
}

router.get('/', function(req, res, next){
	res.render('search/search', {currentWeather:"", searchResults:[]});
});

router.post('/', function(req, res, next){
	
	var searchResults = [];
	searchForAHikde(req.body, req, res,function(searchResults,weather, error){
		searchResults = searchResults;
		if(!error){
			res.render('search/search', {
			currentWeather: weather,
			searchResults:searchResults.rows
		});
		}
		else{
			console.log(error);
			res.send(error);
		}
	});
	
});

function searchForAHikde(params, req, res, callback){
	var searchResults = [];

	var searchQuery = '\'%' + params.search +'%\''
	knex.raw('SELECT name FROM hikesinfo WHERE name ILIKE '+  searchQuery).then(function(results){
		searchResults = results;
	});

	if(validator.zipCode(params.zipcode)){
		res.cookie('zipcode', params.zipcode);
		if(req.cookies.zipcode){

			var apiURL = 'http://api.openweathermap.org/data/2.5/weather'
			var WEATHER_API_KEY = process.env['WEATHER_API_KEY'];
			var zipcode = req.cookies.zipcode;

			var url = apiURL+'?zip='+zipcode+',us&APPID='+WEATHER_API_KEY;

			request(url, function (error, response, body){
				var weather = JSON.parse(body);
				console.log(weather);
				console.log(searchResults.rows);
				callback(searchResults, weather, error);
				
			});
		}
	}
	else{
		res.send('not a valid zipCode');
	}
}
module.exports = router;