const router = require('express').Router();

const UserControllers = require('../controllers/UserControllers');

router.post('/register', UserControllers.register);
router.post('/login', UserControllers.login);

router.get('/checkuser', UserControllers.checkUser);
router.get('/:id', UserControllers.getUserById);

module.exports = router;
