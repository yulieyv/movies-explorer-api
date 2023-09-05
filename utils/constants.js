const OK_STATUS = 200;
const CREATED_STATUS = 201;
// Регулярное выражение для проверки URL
const regexLink = /^https?:\/\/[^\s/$.?#].[^\s]*$/;


module.exports = {
  OK_STATUS,
  CREATED_STATUS,
  regexLink,
};
