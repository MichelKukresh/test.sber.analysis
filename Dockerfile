# устанавливаем официальный образ Node.js
FROM node:16-alpine

# указываем рабочую (корневую) директорию
WORKDIR /app

# копируем основные файлы приложения из папки backend в рабочую директорию
COPY backend/package.json backend/package-lock.json ./

# устанавливаем указанные зависимости NPM на этапе установки образа
RUN npm install

# после установки копируем все файлы проекта из папки backend в рабочую директорию
COPY backend ./
# COPY src ./
COPY src ./src/

# запускаем основной скрипт в момент запуска контейнера
CMD ["npm", "start"]
