var bcrypt = require('bcrypt');

module.exports = {
	users: [
	{
		email: 'halah.1989@hotmail.com',
		password: bcrypt.hashSync('password', 8)
	},
	{
		email: "halah9@gmail.com",
		password: bcrypt.hashSync('password', 8)
	},
	{
		email: 'lissa89@gmail.com',
		password: bcrypt.hashSync('password', 8)
	}
	]
};