const Pet = require('../models/Pet');

const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

module.exports = class PetControllers {
	static async create(req, res) {
		const { name, type, age, weight, color } = req.body;

		const images = req.files;

		const token = getToken(req);
		const user = await getUserByToken(token);

		if (!name) {
			res.status(422).json({ message: 'O nome é obrigatório!' });
			return;
		}
		if (images.length === 0) {
			res.status(422).json({ message: 'Ao menos uma imagem é obrigatória!' });
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
			type: type.toLowerCase(),
			age,
			weight,
			color: color.toLowerCase(),
			available: true,
			images: [],
			user: {
				_id: user._id,
				name: user.name,
				phone: user.phone,
				image: user.image,
			},
		});

		images.map((image) => {
			pet.images.push(image.filename);
		});

		try {
			const newPet = await pet.save();
			res.status(201).json({ message: 'Pet cadastrado com sucesso!', newPet });
		} catch (err) {
			res.status(500).json({ message: err });
		}
	}

	static async getAll(req, res) {
		const pets = await Pet.find().sort('-createdAt');

		res.status(200).json({ message: 'Todos os pets cadastrados', pets });
	}

	static async getAllUserPets(req, res) {}
};
