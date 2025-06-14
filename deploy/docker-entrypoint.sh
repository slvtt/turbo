#!/bin/sh

# Запуск web-приложения
node /app/web/server.js &

# Запуск docs-приложения
node /app/docs/server.js &

# Бесконечное ожидание
tail -f /dev/null