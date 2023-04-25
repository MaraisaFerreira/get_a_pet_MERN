const jwt = require('jsonwebtoken');

const User = require('../models/User');

const getUserByToken = async (token) => {
	if (!token) {
		return res.status(401).json({ message: 'Acesso negado!' });
	}

	const decoded = jwt.verify(token, process.env.SECRET);

	const user = await User.findById(decoded.id);

	return user;
};

module.exports = getUserByToken;
