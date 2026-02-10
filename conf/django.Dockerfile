FROM python:3.11.3

# Лог без буферизации и дефолтный порт приложения (может быть переопределён через переменную окружения PORT)
ENV PYTHONUNBUFFERED=1 \
    PORT=8011

RUN mkdir -p /backend 

WORKDIR /backend

COPY . /backend/

RUN apt-get update && apt-get install -y curl && apt-get clean

COPY ./backend/requirements.txt /backend/requirements.txt

RUN pip install -U pip && pip install -r requirements.txt

CMD python manage.py migrate \
    && python manage.py collectstatic --no-input \
    && uvicorn basis.asgi:application --host 0.0.0.0 --port ${PORT:-8011}
    # && gunicorn -b 0.0.0.0:8000 basis.wsgi:application --log-level info

