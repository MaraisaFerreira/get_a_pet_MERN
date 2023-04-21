const router = require('express').Router();

const UserControllers = require('../controllers/UserControllers');

router.post('/register', UserControllers.register);

module.exports = router;
