const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const createUserToken = require('../helpers/createUserToken');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

const ObjectId = require('mongoose').Types.ObjectId;

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
			const savedUser = await user.save();

			await createUserToken(savedUser, req, res);
		} catch (err) {
			res.status(500).json({ message: err });
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;

		if (!email) {
			res.status(422).json({ message: 'O email é um campo obrigatório!' });
			return;
		}

		if (!password) {
			res.status(422).json({ message: 'A senha é um campo obrigatório!' });
			return;
		}

		const user = await User.findOne({ email });
		if (!user) {
			res.status(422).json({ message: 'Esse email não existe!' });
			return;
		}

		const matchPassword = bcrypt.compareSync(password, user.password);
		if (!matchPassword) {
			res.status(422).json({ message: 'Senha incorreta!' });
			return;
		}

		await createUserToken(user, req, res);
	}

	static async checkUser(req, res) {
		let currentUser;

		if (req.headers.authorization) {
			const token = getToken(req);
			const decoded = jwt.decode(token, process.env.SECRET);

			currentUser = await User.findOne({ _id: decoded.id });
			currentUser.password = undefined;
		} else {
			currentUser = null;
		}

		res.status(200).send(currentUser);
	}

	static async getUserById(req, res) {
		const id = req.params.id;
		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: 'Id inválido' });
			return;
		}

		const user = await User.findById(id).select('-password');

		if (!user) {
			res.status(422).json({ message: 'Usuário não encontrado!' });
			return;
		}

		res.status(200).json({ user });
	}

	static async editUser(req, res) {
		const { name, email, phone, password, confirmPassword, newPassword } =
			req.body;

		const token = getToken(req);
		const user = await getUserByToken(token);

		if (!user) {
			res.status(422).json({ message: 'Usuário não encontrado!' });
			return;
		}

		if (req.file) {
			user.image = req.file.filename;
			console.log(
				'🔷 | file: UserControllers.js:141 | req.file.filename:',
				req.file.filename,
			);
		}

		if (!name) {
			res.status(422).json({ message: 'O nome é um campo obrigatório!' });
			return;
		}

		user.name = name;

		if (!email) {
			res.status(422).json({ message: 'O email é um campo obrigatório!' });
			return;
		}

		const existEmail = await User.findOne({ email });
		if (existEmail && user.email !== email) {
			res
				.status(422)
				.json({ message: 'Esse email já está cadastrado para outro usuário!' });
			return;
		}

		user.email = email;

		if (!phone) {
			res
				.status(422)
				.json({ message: 'O número de telefone é um campo obrigatório!' });
			return;
		}

		user.phone = phone;

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

		const matchPassword = bcrypt.compareSync(password, user.password);
		if (!matchPassword) {
			res.status(422).json({ message: 'Senha inválida!' });
			return;
		}

		if (newPassword) {
			const salt = bcrypt.genSaltSync(10);
			const hashPassword = bcrypt.hashSync(newPassword, salt);

			user.password = hashPassword;
		}

		console.log(user);
		try {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: user.id },
				{ $set: user },
				{ new: true },
			);
			res.status(200).json({ message: 'Usuário atualizado!', updatedUser });
		} catch (error) {
			res.status(500).json({ message: 'Falha ao atualizar usuário!' });
		}
	}
};
