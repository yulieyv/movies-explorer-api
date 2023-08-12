const { celebrate, Joi } = require('celebrate');
const {
  regexLink,
  regexImage,
  regexRU,
  regexEN,
} = require('./constants');

module.exports.validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().length(4).required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexImage),
    trailerLink: Joi.string().required().regex(regexLink),
    thumbnail: Joi.string().required().regex(regexImage),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().regex(regexRU),
    nameEN: Joi.string().required().regex(regexEN),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});
