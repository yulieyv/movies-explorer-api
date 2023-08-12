const movieRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateMovieId,
  validateCreateMovie,
} = require('../utils/validation');

movieRouter.get('/movies', getMovies); // возвращает все сохранённые текущим пользователем фильмы
movieRouter.post('/movies', validateCreateMovie, createMovie); // создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
movieRouter.delete('/movies/_id ', validateMovieId, deleteMovie); // удаляет сохранённый фильм по id

module.exports = movieRouter;
