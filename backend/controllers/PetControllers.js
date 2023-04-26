const Pet = require('../models/Pet');

const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

module.exports = class PetControllers {
	static async create(req, res) {
		const { name, type, age, weight, color } = req.body;

		const token = getToken(req);
		const user = await getUserByToken(token);

		if (!name) {
			res.status(422).json({ message: 'O nome é obrigatório!' });
			return;
		}
		if (!type) {
			res.status(422).json({ message: 'O tipo é obrigatório!' });
			return;
		}
		if (!age) {
			res.status(422).json({ message: 'A idade é obrigatória!' });
			return;
		}
		if (!weight) {
			res.status(422).json({ message: 'O peso é obrigatório!' });
			return;
		}
		if (!color) {
			res.status(422).json({ message: 'A cor é obrigatória!' });
			return;
		}

		const pet = new Pet({
			name,
			type,
			age,
			weight,
			color,
			available: true,
			image: [],
			user: {
				_id: user._id,
				name: user.name,
				phone: user.phone,
				image: user.image,
			},
		});

		try {
			const newPet = await pet.save();
			res.status(201).json({ message: 'Pet cadastrado com sucesso!', newPet });
		} catch (err) {
			res.status(500).json({ message: err });
		}
	}
};
