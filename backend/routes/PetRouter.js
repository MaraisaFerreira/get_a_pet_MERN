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

module.exports = router;
