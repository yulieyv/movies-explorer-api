const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errorMessages = require('../utils/errors/ErrorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

const { OK_STATUS, CREATED_STATUS } = require('../utils/constants');

const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const InternalServerError = require('../utils/errors/InternalServerError');
const ConflictError = require('../utils/errors/ConflictError');

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      res.status(CREATED_STATUS).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(errorMessages.incorrectInfo));
      }
      if (error.code === 11000) {
        return next(
          new ConflictError(errorMessages.incorrectEmail),
        );
      }
      return next(error);
    });
};

// Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(OK_STATUS).send({ token });
    })
    .catch(next);
};

// Получение информации о зарегистрированном пользователе
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(errorMessages.unfindedUser));
      }
      return res.status(OK_STATUS).send(user);
    })
    .catch(next);
};

// Обновление информации о пользователе
module.exports.updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessages.notfoundedUser);
      }
      res.status(OK_STATUS).send(user);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(errorMessages.invalidData));
      }
      return next(new InternalServerError(errorMessages.internalServer));
    });
};
