const movieRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovieId, validateCreateMovie } = require('../utils/validation');

movieRouter.get('/', getMovies); // возвращает все сохранённые текущим пользователем фильмы
movieRouter.post('/', validateCreateMovie, createMovie); // создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
movieRouter.delete('/:movieId', validateMovieId, deleteMovie); // удаляет сохранённый фильм по id

module.exports = movieRouter;
