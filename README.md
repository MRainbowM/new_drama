# new_drama

# Разработка

## Запуск проекта

### Сборка контейнера
```sh
docker-compose up --build -d django-new-drama
```
```sh
docker-compose -f docker-compose.local.yml up --build 
```
### Остановка контейнера
```sh
docker-compose stop django-new-drama
```

## Backend

### Запуск сервера

#### with uvicorn
```sh
docker-compose -f docker-compose.local.yml exec django-new-drama python3 -m uvicorn basis.asgi:application --reload --host 0.0.0.0 --port 8001
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

### Бэкап бд

```sh
docker exec -t postgres-new-drama pg_dumpall -c -U postgres > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
```

### Накатить бэкап
```sh
cat dump_10-02-2026_11_55_12.sql | docker exec -i postgres-new-drama psql -U postgres
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

## Docker

### Скопировать файлы из контейнера

```
docker cp django-new-drama:/backend/media/ /root/new_drama/media/
```
обратно так же, только поменять местами пути

Локально
```sh
docker cp  media/ django-new-drama:/backend/
```

# Продакшен

## Запуск докер-контейнеров
```sh
docker compose up --build
```
