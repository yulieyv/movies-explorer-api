const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { OK_STATUS, CREATED_STATUS } = require('../utils/constants');

const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const InternalServerError = require('../utils/errors/InternalServerError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const errorMessages = require('../utils/errors/ErrorMessages');

// Получение всех сохранённых текущим пользователем фильмов
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        return next(new NotFoundError(errorMessages.notfoundedMovies));
      }
      return res.status(OK_STATUS).send(movies);
    })
    .catch(next);
};

// Cоздание фильма
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATED_STATUS).send(movie);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(errorMessages.invalidData));
      }
      return next(new InternalServerError(errorMessages.incorrectMovie));
    });
};

// Удаление сохраненного фильма по ID
module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById({ _id: req.params.movieId })
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(errorMessages.notfoundedMovieId));
      }
      if (movie.owner.toString() !== owner) {
        return next(new ForbiddenError(errorMessages.incorrectDelete));
      }
      return Movie.deleteOne({ _id: req.params.movieId }).then(
        (deletedMovie) => {
          res.status(OK_STATUS).send(deletedMovie);
        },
      );
    })
    .catch(next);
};
