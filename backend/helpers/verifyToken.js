const jwt = require('jsonwebtoken');
const getToken = require('./getToken');

const verifyToken = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ message: 'Acesso negado!' });
	}

	const token = getToken(req);
	if (!token) {
		return res.status(401).json({ message: 'Acesso negado!' });
	}

	try {
		const verifiedUser = jwt.verify(token, process.env.SECRET);
		req.user = verifiedUser;
		next();
	} catch (error) {
		return res.status(400).json({ message: 'Token inválido' });
	}
};

module.exports = verifyToken;
