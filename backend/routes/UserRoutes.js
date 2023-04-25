const router = require('express').Router();

const UserControllers = require('../controllers/UserControllers');

const verifyToken = require('../helpers/verifyToken');

router.post('/register', UserControllers.register);
router.post('/login', UserControllers.login);

router.get('/checkuser', UserControllers.checkUser);
router.get('/:id', UserControllers.getUserById);

router.patch('/edit', verifyToken, UserControllers.editUser);

module.exports = router;
