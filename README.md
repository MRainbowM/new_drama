# new_drama

## Запуск проекта

### Сборка контейнера
```sh
docker-compose up --build -d django-new-drama
```

### Остановка контейнера
```sh
docker-compose stop django-new-drama
```

## Backend

### Запуск сервера
```sh
docker-compose exec django-new-drama python3 manage.py runserver 0.0.0.0:8011
```

### Создание миграций
```sh
docker-compose exec django-new-drama python3 manage.py makemigrations
```

### Применение миграций
```sh
docker-compose exec django-new-drama python3 manage.py migrate
```

### Cоздание супер-пользователя
```sh
docker-compose exec django-new-drama python3 manage.py createsuperuser
```
```sh
docker compose exec django-new-drama python3 manage.py createsuperuser
```

### Создание приложения
```sh
docker-compose exec django-new-drama python3 manage.py startapp {app_name}
```

## Frontend

### Запуск фронтенда

```sh
cd frontend
```
```sh
npm run dev
```

# Разработка

## Frontend

### Установка зависимостей
```sh
npm install
```

### Генерация схем данных api из сваггера
```sh
npm run api-generate
```


