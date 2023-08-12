const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  // страна создания фильма. Обязательное поле-строка
  country: {
    type: String,
    required: true,
  },
  // режиссёр фильма. Обязательное поле-строка
  director: {
    type: String,
    required: true,
  },
  // длительность фильма. Обязательное поле-число
  duration: {
    type: Number,
    required: true,
  },
  // год выпуска фильма. Обязательное поле-строка
  year: {
    type: Number,
    required: true,
  },
  // описание фильма. Обязательное поле-строка
  description: {
    type: String,
    required: true,
  },
  // ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неверный формат URL',
    },
  },
  // ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неверный формат URL',
    },
  },
  // миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неверный формат URL',
    },
  },
  // _id пользователя, который сохранил фильм. Обязательное поле
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  //Обязательное поле в формате number
  movieId: {
    type: Number,
    required: true,
  },
  // название фильма на русском языке. Обязательное поле-строка
  nameRU: {
    type: String,
    required: true,
  },
  // название фильма на английском языке. Обязательное поле-строка
  nameEN: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
