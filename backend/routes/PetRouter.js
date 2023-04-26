const router = require('express').Router();

const PetControllers = require('../controllers/PetControllers');

const verifyToken = require('../helpers/verifyToken');

router.post('/create', verifyToken, PetControllers.create);

module.exports = router;
