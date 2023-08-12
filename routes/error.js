const errorRouter = require('express').Router();
const NotFoundError = require('../utils/errors/NotFoundError');
const auth = require('../middlewares/auth');

errorRouter.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Неверный URL запроса'));
});

module.exports = errorRouter;
