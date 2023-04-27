const router = require('express').Router();

const PetControllers = require('../controllers/PetControllers');

const verifyToken = require('../helpers/verifyToken');
const { imageUpload } = require('../helpers/imageUploadPath');

router.post(
	'/create',
	verifyToken,
	imageUpload.array('images'),
	PetControllers.create,
);

router.get('/', PetControllers.getAll);
router.get('/mypets', verifyToken, PetControllers.getAllUserPets);

module.exports = router;
