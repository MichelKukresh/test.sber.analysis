const express = require('express');

// cors
const cors = require('cors');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

// импортируем устанавливаем лимитер для исключения DoS атак npm i express-rate-limit
const rateLimit = require('express-rate-limit');

// использование helmet для простановки security-заголовков npm install --save helmet
const helmet = require('helmet');

// logger
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login } = require('./controllers/users');

const routesCharts = require('./routes/charts');

const auth = require('./middlewares/auth');

const ErrorNotFound = require('./errors/ErrorNotFound');
const centralizedErrorHandler = require('./middlewares/centralizedErrorHandler');

const app = express();

// настраиваем устанавливаем лимитер для исключения DoS атак
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors());

app.use(express.json());

// используем устанавливаем лимитер для исключения DoS атак
app.use(limiter);
app.use(helmet());

// !!важно до роутов
app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', celebrate({
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/charts', routesCharts); // запускаем

// !!важно до обработчика ошибок, но после маршрутов
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Неправильный путь'));
});

// централизованный обработчик ошибок
app.use(centralizedErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
