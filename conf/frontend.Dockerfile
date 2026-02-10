# Устанавливаем базовый образ
FROM node:20.18.0

# Создаем директорию приложения
WORKDIR /app

# Устанавливаем необходимые зависимости для сборки
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Копируем package.json и package-lock.json
COPY ./frontend/package*.json ./

# Устанавливаем зависимости приложения
RUN npm ci

# Копируем исходный код
COPY ./frontend .

# --- Аргументы для сборки (build-time) ---
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID
ARG NEXT_PUBLIC_YANDEX_VERIFICATION
ARG API_URL

# --- Делаем доступными внутри контейнера ---
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_YANDEX_METRIKA_ID=$NEXT_PUBLIC_YANDEX_METRIKA_ID
ENV NEXT_PUBLIC_YANDEX_VERIFICATION=$NEXT_PUBLIC_YANDEX_VERIFICATION
ENV API_URL=$API_URL

# Определяем порт, который будет прослушивать приложение
ARG PORT=3001
ENV PORT=$PORT
EXPOSE $PORT

# Собираем приложение для production
RUN npm run build

# Команда по умолчанию для запуска
CMD ["sh", "-c", "npm run start -- -p $PORT"]
# CMD ["sh", "-c", "npm run dev -- -p $PORT"]