var index = require('./index');
var auth = require('./auth');
var users = require('./users');
var hikes = require('./hikes');
var list = require('./list');

module.exports = {
	index : index,
	auth: auth,
	users: users,
	hikes: hikes,
    list: list
}
