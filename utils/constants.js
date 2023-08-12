const OK_STATUS = 200;
const CREATED_STATUS = 201;
// Регулярное выражение для проверки URL
const regexLink = /^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])/im;
// Регулярное выражение для проверки URL картинки
const regexImage = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  OK_STATUS,
  CREATED_STATUS,
  regexLink,
  regexImage,
};
