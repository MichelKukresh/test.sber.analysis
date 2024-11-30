# Тестовое задание Сбер Аналитика

## Описание проекта

Одностраничный сайт с аналитической отчетностью, разработанный с использованием технологий HTML, CSS и JavaScript. Проект реализован в соответствии с методологией БЭМ (Nested) и адаптирован под различные разрешения экранов и браузеры. Для визуализации данных используется библиотека графиков.

## Ссылки

- [Сайт проекта](https://michelkukresh.github.io/test.sber.analytics/src/index.html)
- [Дизайн-макет](https://www.figma.com/design/eAxaBgSCzRfq03sH3H72vm/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5_%D0%B4%D0%BB%D1%8F_%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA%D0%B0_%D0%BE%D0%BA%D1%82%D1%8F%D0%B1%D1%80%D1%8C2024?node-id=7-6764&t=OnF99UW9zoB8n9mC-1)

## Демонстрация

- Логин / пароль: login1 / pass1 (все данные вымышленные)

## Инструкция по развертыванию с использованием Docker

1. Клонируйте проект:


   ```git clone https://github.com/MichelKukresh/test.sber.analytics.git```
   

2. Откройте терминал в корне проекта.

3. Соберите проект:   

   ```docker build . -t nodeproject```
   

4. Совместите порты. **ВНИМАНИЕ!** Проект настроен только на порт 8080:


   ```docker run -p 8080:8080 nodeproject```
   

5. Перейдите по ссылке или в подсказке в терминале:

   [http://localhost:8080/src/index.html](http://localhost:8080/src/index.html)

## Проверка API

В консоли происходит автоматический запрос с логированием и запросом данных к графику, доступных на панели разработчика.

Либо используйте Postman для проверки.

### Проверка авторизации

**URL:** http://localhost:8080/signin  
**Body:**
json
{
  "username": "login1",
  "password": "pass1"
}

### Проверка получения данных

**URL:** http://localhost:8080/charts  
Укажите Bearer token, который получите выше.