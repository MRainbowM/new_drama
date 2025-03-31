# Устанавливаем базовый образ
FROM node:22.9.0-alpine

# Создаем директорию приложения
WORKDIR /frontend

# Копируем package.json и package-lock.json
COPY ./frontend/package*.json ./

# Устанавливаем зависимости приложения
RUN npm install

# Копируем исходный код приложения
COPY /frontend /frontend/

# # Компилируем TypeScript в JavaScript
# RUN npx tsc

# Обновление пакетного менеджера
RUN npm install -g npm@11.2.0

# Собираем приложение
RUN npm run build

# Определяем порт, который будет прослушивать приложение
EXPOSE 3000

# Запускаем приложение
CMD [ "npm", "start" ]