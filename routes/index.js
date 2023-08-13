const router = require('express').Router();
const NotFoundError = require('../utils/errors/NotFoundError');

const userRouter = require('./users');
const movieRouter = require('./movies');

const auth = require('../middlewares/auth');
const { validateLogin, validateRegister } = require('../utils/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Неверный URL запроса'));
});

module.exports = router;
