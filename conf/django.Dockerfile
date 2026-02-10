FROM python:3.11.3-slim AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /backend

# Ставим build-зависимости для сборки wheels (Pillow/psycopg2 и т.п.)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libpq-dev \
        libjpeg62-turbo-dev \
        zlib1g-dev \
        libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/*

COPY ./backend/requirements.txt /backend/requirements.txt

RUN python -m pip install --upgrade pip setuptools wheel \
    && python -m pip wheel --wheel-dir=/wheels -r requirements.txt


FROM python:3.11.3-slim AS runtime

# Лог без буферизации и дефолтный порт приложения (может быть переопределён через переменную окружения PORT)
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PORT=8011

WORKDIR /backend

# Runtime-зависимости для Pillow/psycopg2
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libpq5 \
        libjpeg62-turbo \
        zlib1g \
        libfreetype6 \
    && rm -rf /var/lib/apt/lists/*

COPY ./backend/requirements.txt /backend/requirements.txt
COPY --from=builder /wheels /wheels

RUN python -m pip install --no-cache-dir --no-index --find-links=/wheels -r requirements.txt \
    && rm -rf /wheels

# Копируем только backend (а не весь репозиторий) — меньше контекст и лучше кэш
COPY ./backend/ /backend/

CMD python manage.py migrate \
    && python manage.py collectstatic --no-input \
    && uvicorn basis.asgi:application --host 0.0.0.0 --port ${PORT:-8011}
    # && gunicorn -b 0.0.0.0:8000 basis.wsgi:application --log-level info

