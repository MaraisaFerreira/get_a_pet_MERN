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
router.get('/:id', PetControllers.getPetById);
router.get('/all/:type', PetControllers.getPetsByType);
router.get('/mypets', verifyToken, PetControllers.getAllUserPets);
router.get('/myadoptions', verifyToken, PetControllers.getMyAdoptions);
router.delete('/:id', verifyToken, PetControllers.removeById);
router.patch(
	'/:id',
	verifyToken,
	imageUpload.array('images'),
	PetControllers.updateById,
);

module.exports = router;
