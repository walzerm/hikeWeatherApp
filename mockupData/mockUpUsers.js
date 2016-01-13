var bcrypt = require('bcrypt');

module.exports = {
	users: [
	{
		email: 'halah.1989@hotmail.com',
		passowrd: bcrypt.hashSync('passowrd', 8)
	},
	{
		email: 'halah9@gmail.com',
		passowrd: bcrypt.hashSync('passowrd', 8)
	},
	{
		email: 'lissa89@gmail.com',
		passowrd: bcrypt.hashSync('passowrd', 8)
	}
	]
};