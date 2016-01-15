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
			searchResults:searchResults
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
	/*
		*** elevation ***
		easy < 500 ft
		meduim > 500ft && < 1000 ft
		hard > 1000ft
	*/
	var elevationToValues = {
		'Easy': '< 500',
		'Meduim': '> 500 AND elevation < 1000',
		'Hard': '> 1000'
	}

	var elevation = elevationToValues[params.elevation];
	console.log(elevation);

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
				// get  location from weather response
				/*
					 the returned object will be like this
					 { lon: -122.27, lat: 37.87 }
				*/
				var location = weather.coord;
				// get the latitude form location
				var latitude = location.lat;
				// get the longitude from location
				var longitude = location.lon;
				// set the unit
				var unit = 'mile';
				//get the dictance (radius)
				var distance = params.radius;
				// make the url 
				var zipcodeapiURL ='https://www.zipcodeapi.com/rest/'+process.env['ZIPCODE_API_KEY']+'/radius-sql.json/'+latitude+'/'+longitude+'/degrees/'+distance+'/'+unit+'/latitude/longitude/1';
				// send request to API
				request(zipcodeapiURL, function(error,response,body){
					if(!error){
						// parse the query 
						var returnedQuery = JSON.parse(body).where_clause;
						//replace every ! with NOT
						var longQuery = returnedQuery.replace(/!/g,'NOT');
						// create filtering by name query
						var nameQuery = ' AND name ILIKE ' + searchQuery;
						// create elevation query
						var elevationQuery = ' AND elevation IS NOT NULL AND elevation '  + elevation  ; 
						// make the query request
						knex.raw('SELECT name FROM hikesinfo WHERE '+ longQuery + nameQuery + elevationQuery).then(function(stuffs){
							// save results
							searchResults = searchResults.concat(stuffs.rows);
							// pass it back to route
							callback(searchResults, weather, error);
						});
					}
				});				
			});			
		}
	}
	else{
		res.send('not a valid zipCode');
	}
}
module.exports = router;