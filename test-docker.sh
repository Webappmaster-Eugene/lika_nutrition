#!/bin/bash

# Скрипт для локальной проверки Docker контейнера

set -e

echo "🚀 Запуск локальной проверки Docker контейнера..."
echo ""

# Проверка Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker Desktop."
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Docker daemon не запущен. Запустите Docker Desktop."
    exit 1
fi

echo "✅ Docker установлен и запущен"
echo ""

# Остановка существующих контейнеров
echo "🛑 Остановка существующих контейнеров..."
docker-compose down 2>/dev/null || true

# Освобождение порта 3000
echo "🔓 Освобождение порта 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "Порт 3000 свободен"

# Сборка образа
echo "🔨 Сборка Docker образа..."
docker-compose build

# Запуск контейнера
echo "▶️  Запуск контейнера..."
docker-compose up -d

# Ожидание запуска
echo "⏳ Ожидание запуска контейнера (5 секунд)..."
sleep 5

# Проверка статуса
echo ""
echo "📊 Статус контейнера:"
docker-compose ps

# Проверка healthcheck
echo ""
echo "🏥 Проверка healthcheck:"
docker-compose ps --format json | grep -o '"Health":"[^"]*"' || echo "Healthcheck в процессе..."

# Проверка доступности
echo ""
echo "🌐 Проверка доступности сайта:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Сайт доступен на http://localhost:3000 (HTTP $HTTP_CODE)"
else
    echo "❌ Сайт недоступен (HTTP $HTTP_CODE)"
fi

# Проверка robots.txt
echo ""
echo "🤖 Проверка robots.txt:"
ROBOTS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/robots.txt || echo "000")
if [ "$ROBOTS_CODE" = "200" ]; then
    echo "✅ robots.txt доступен (HTTP $ROBOTS_CODE)"
else
    echo "⚠️  robots.txt недоступен (HTTP $ROBOTS_CODE)"
fi

# Проверка sitemap.xml
echo ""
echo "🗺️  Проверка sitemap.xml:"
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/sitemap.xml || echo "000")
if [ "$SITEMAP_CODE" = "200" ]; then
    echo "✅ sitemap.xml доступен (HTTP $SITEMAP_CODE)"
else
    echo "⚠️  sitemap.xml недоступен (HTTP $SITEMAP_CODE)"
fi

# Проверка security headers
echo ""
echo "🔒 Проверка security headers:"
HEADERS=$(curl -s -I http://localhost:3000/ | grep -E "(X-Frame-Options|X-Content-Type-Options|X-XSS-Protection)" || echo "")
if [ -n "$HEADERS" ]; then
    echo "✅ Security headers установлены:"
    echo "$HEADERS"
else
    echo "⚠️  Security headers не найдены"
fi

echo ""
echo "📝 Логи контейнера (последние 10 строк):"
docker-compose logs --tail=10

echo ""
echo "✨ Проверка завершена!"
echo "🌐 Откройте http://localhost:3000 в браузере"
echo ""
echo "Для остановки контейнера выполните: docker-compose down"
