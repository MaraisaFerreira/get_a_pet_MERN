const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res) => {
	const token = jwt.sign(
		{
			name: user.name,
			id: user._id,
		},
		process.env.SECRET,
	);

	res.status(200).json({
		message: 'Usuário autenticado.',
		token,
		userID: user._id,
	});
};

module.exports = createUserToken;
