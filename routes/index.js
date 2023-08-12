const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const errorRouter = require('./error');

const auth = require('../middlewares/auth');
const { validateLogin, validateRegister } = require('../utils/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', errorRouter);

module.exports = router;
