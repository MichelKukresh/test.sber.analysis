require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ErrorAuthorized = require("../errors/ErrorAuthorized");

const hardcodedHash = "$2b$10$Dzx6hdNsHlcfxsJ1UxlkTOfvQRCmVv9sHnHUY2EqeEWf5C42n0oJW"; // Хардкодим хеш, так как нет базы данных, сохраняется при регистрации

module.exports.login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { username, password } = req.body;

  bcrypt.compare(password, hardcodedHash)
    .then((matched) => {
      if (username === "login1" && matched) {
        const token = jwt.sign(
          { _id: username },
          NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
          { expiresIn: "7d" }
        );
        res.send({ token });
      } else {
        next(new ErrorAuthorized("Неправильные логин или пароль"));
      }
    })
    .catch((err) => {
      next(err);
    });
};
