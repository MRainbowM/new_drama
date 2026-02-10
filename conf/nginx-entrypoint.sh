#!/bin/sh

# Установка значений по умолчанию для переменных
export NGINX_USER=${NGINX_USER:-root}
export NGINX_WORKER_PROCESSES=${NGINX_WORKER_PROCESSES:-1}
export NGINX_WORKER_CONNECTIONS=${NGINX_WORKER_CONNECTIONS:-1024}
export NGINX_PORT=${NGINX_PORT:-80}
export NGINX_SERVER_NAME=${NGINX_SERVER_NAME:-localhost}
export FRONTEND_URL=${FRONTEND_URL:-http://frontend-new-drama:3000}
export BACKEND_URL=${BACKEND_URL:-http://django-new-drama:8011}
export NGINX_PROXY_CONNECT_TIMEOUT=${NGINX_PROXY_CONNECT_TIMEOUT:-70s}
export NGINX_PROXY_SEND_TIMEOUT=${NGINX_PROXY_SEND_TIMEOUT:-86400}
export NGINX_PROXY_READ_TIMEOUT=${NGINX_PROXY_READ_TIMEOUT:-86400}
export NGINX_SEND_TIMEOUT=${NGINX_SEND_TIMEOUT:-86400}
export NGINX_STATIC_AUTOINDEX=${NGINX_STATIC_AUTOINDEX:-on}
export NGINX_STATIC_PATH=${NGINX_STATIC_PATH:-/static}
export NGINX_MEDIA_PATH=${NGINX_MEDIA_PATH:-/backend/media}
export NGINX_CLIENT_MAX_BODY_SIZE=${NGINX_CLIENT_MAX_BODY_SIZE:-100M}

# SSL
export NGINX_SSL_CERT_PATH=${NGINX_SSL_CERT_PATH:-/etc/nginx/certs/fullchain.pem}
export NGINX_SSL_KEY_PATH=${NGINX_SSL_KEY_PATH:-/etc/nginx/certs/privkey.pem}

# Выбор шаблона: если сертификаты существуют, используем SSL-конфиг
TEMPLATE_PATH="/etc/nginx/nginx.conf.template"

echo "[nginx-entrypoint] Проверяем содержимое /etc/letsencrypt/live/:"
ls -R /etc/letsencrypt/live/

if [ -s "$NGINX_SSL_CERT_PATH" ] && [ -s "$NGINX_SSL_KEY_PATH" ]; then
  TEMPLATE_PATH="/etc/nginx/nginx-ssl.conf.template"
  echo "[nginx-entrypoint] SSL сертификаты найдены, используем конфиг: $TEMPLATE_PATH"
else
  echo "[nginx-entrypoint] SSL сертификаты не найдены, используем HTTP конфиг: $TEMPLATE_PATH"
  echo "[nginx-entrypoint] Значения переменных:"
  echo "NGINX_SSL_CERT_PATH=$NGINX_SSL_CERT_PATH"
  echo "NGINX_SSL_KEY_PATH=$NGINX_SSL_KEY_PATH"
fi
echo "[nginx-entrypoint] Значение переменной NODE_ENV:"
echo "NODE_ENV=$NODE_ENV"
if [ "$NODE_ENV" = "production" ]; then
  echo "[nginx-entrypoint] NODE_ENV is production, generating sitemap and robots"
else
  echo "[nginx-entrypoint] NODE_ENV is not production, skipping sitemap and robots"
fi

# Подстановка переменных окружения в конфигурацию nginx
envsubst '${NGINX_USER} ${NGINX_WORKER_PROCESSES} ${NGINX_WORKER_CONNECTIONS} ${NGINX_PORT} ${NGINX_SERVER_NAME} ${FRONTEND_URL} ${BACKEND_URL} ${NGINX_PROXY_CONNECT_TIMEOUT} ${NGINX_PROXY_SEND_TIMEOUT} ${NGINX_PROXY_READ_TIMEOUT} ${NGINX_SEND_TIMEOUT} ${NGINX_STATIC_AUTOINDEX} ${NGINX_STATIC_PATH} ${NGINX_MEDIA_PATH} ${NGINX_CLIENT_MAX_BODY_SIZE} ${NGINX_SSL_CERT_PATH} ${NGINX_SSL_KEY_PATH}' < "$TEMPLATE_PATH" > /etc/nginx/nginx.conf

# Запуск nginx
exec nginx -g 'daemon off;' 