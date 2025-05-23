# new_drama

# Разработка

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

#### with uvicorn
```sh
docker-compose exec django-new-drama python3 -m uvicorn basis.asgi:application --reload --host 0.0.0.0 --port 8011
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

### Сборка статики Django
```sh
docker-compose exec django-new-drama python3 manage.py collectstatic
```

### Запуск backend тестов
```sh
docker-compose exec django-new-drama python3 -m pytest
```


## Frontend

### Запуск фронтенда

```sh
cd frontend
```
```sh
npm run dev
```




### Установка зависимостей
```sh
npm install
```

### Генерация схем данных api из сваггера
```sh
npm run api-generate
```

# Продакшен

## Запуск докер-контейнеров
```sh
docker compose up --build
```
