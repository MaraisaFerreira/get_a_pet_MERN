const User = require('../models/User');

module.exports = class UserControllers {
	static async register(req, res) {
		res.json('Register Route ok!');
	}
};
