const userRouter = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { validateUpdateUser } = require('../utils/validation');

userRouter.get('/me', getUserInfo); // возвращает информацию о пользователе (email и имя)
userRouter.patch('/me', validateUpdateUser, updateUserInfo); // обновляет информацию о пользователе (email и имя)

module.exports = userRouter;
