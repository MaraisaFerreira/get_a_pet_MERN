const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = class UserControllers {
	static async register(req, res) {
		const { name, email, phone, password, confirmPassword } = req.body;

		if (!name) {
			res.status(422).json({ message: 'O nome é um campo obrigatório!' });
			return;
		}
		if (!email) {
			res.status(422).json({ message: 'O email é um campo obrigatório!' });
			return;
		}
		if (!phone) {
			res
				.status(422)
				.json({ message: 'O número de telefone é um campo obrigatório!' });
			return;
		}
		if (!password) {
			res.status(422).json({ message: 'A senha é um campo obrigatório!' });
			return;
		}
		if (!confirmPassword) {
			res
				.status(422)
				.json({ message: 'A confirmação de senha é um campo obrigatório!' });
			return;
		}

		if (password !== confirmPassword) {
			res.status(422).json({ message: 'As senhas não são iguais!' });
			return;
		}

		const userExists = await User.findOne({ email });
		if (userExists) {
			res
				.status(422)
				.json({ message: 'Já existe um usuário cadastrado com esse email' });
			return;
		}

		const salt = bcrypt.genSaltSync(10);
		const passwordHash = bcrypt.hashSync(password, salt);

		const user = new User({
			name,
			email,
			phone,
			password: passwordHash,
		});

		try {
			const registeredUser = await user.save();
			res
				.status(201)
				.json({ message: 'Usuário registrado com sucesso!', registeredUser });
		} catch (err) {
			res.status(500).json({ message: err });
		}
	}
};
