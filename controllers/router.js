var index = require('./index');
var auth = require('./auth');
var users = require('./users');
var weather = require('./weather');
var hikes = require('./hikes');

module.exports = {
	index : index,
	auth: auth,
	users: users,
	weather: weather,
	hikes: hikes
}