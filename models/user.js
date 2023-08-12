const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неверный формат URL',
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  name: {
    required: false,
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Имя',
  },

}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError('Неверные почта или пароль'),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError('Неверные почта или пароль'),
          );
        }
        return user;
      });
    });
};

const User = mongoose.model('user', userSchema);
module.exports = User;
