# Инструкция по деплою в Dokploy через Docker Compose

## ✅ Подготовка завершена

Проект полностью подготовлен для деплоя в Dokploy через Docker Compose.

## 📋 Созданные файлы

- ✅ `Dockerfile` - многоэтапная сборка (Node.js → Nginx)
- ✅ `docker-compose.yml` - конфигурация для Dokploy
- ✅ `nginx.conf` - конфигурация nginx с security headers
- ✅ `.dockerignore` - исключение ненужных файлов
- ✅ `test-docker.sh` - скрипт для локальной проверки

## 🚀 Локальная проверка

### Перед проверкой убедитесь:
1. Docker Desktop запущен
2. Порт 3000 свободен

### Быстрая проверка:
```bash
./test-docker.sh
```

### Ручная проверка:
```bash
# 1. Сборка образа
docker-compose build

# 2. Запуск контейнера
docker-compose up -d

# 3. Проверка статуса
docker-compose ps

# 4. Проверка логов
docker-compose logs -f

# 5. Откройте в браузере
# http://localhost:3000

# 6. Остановка
docker-compose down
```

## 📦 Деплой в Dokploy

### Шаг 1: Подготовка репозитория
Убедитесь, что все файлы закоммичены в Git:
- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`
- `.dockerignore`

### Шаг 2: Создание проекта в Dokploy
1. Войдите в Dokploy
2. Создайте новый проект
3. Выберите тип: **Docker Compose**
4. Подключите Git репозиторий
5. Укажите ветку (обычно `main` или `master`)

### Шаг 3: Настройка переменных окружения

**Обязательные переменные:**
- `NEXT_PUBLIC_SITE_URL` = `https://likanutrition.ru` (URL вашего сайта)

**Опциональные переменные:**
- `NEXT_PUBLIC_GOOGLE_VERIFICATION` = (код верификации Google Search Console)
- `NEXT_PUBLIC_YANDEX_VERIFICATION` = (код верификации Yandex Webmaster)
- `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` = (токен Telegram бота для форм)
- `NEXT_PUBLIC_TELEGRAM_CHAT_ID` = (ID чата для получения сообщений)

**Важно:** Все переменные с префиксом `NEXT_PUBLIC_` должны быть установлены во время сборки Docker образа. В Dokploy они автоматически передаются в процесс сборки.

### Шаг 4: Настройка портов
- **Внешний порт**: настройте в Dokploy (обычно 80 или через Traefik)
- **Внутренний порт**: 80 (уже настроен в docker-compose.yml)

### Шаг 5: Деплой
Нажмите "Deploy" в Dokploy. Процесс включает:
1. Клонирование репозитория
2. Сборку Docker образа
3. Запуск контейнера через docker-compose
4. Проверку healthcheck

## 🔍 Проверка после деплоя

1. **Основной сайт**: `https://likanutrition.ru/`
2. **robots.txt**: `https://likanutrition.ru/robots.txt`
3. **sitemap.xml**: `https://likanutrition.ru/sitemap.xml`
4. **Security headers**: проверьте через https://securityheaders.com/
5. **Изображения**: убедитесь, что все изображения загружаются

## 🏥 Healthcheck

Контейнер имеет настроенный healthcheck:
- Проверка каждые 30 секунд
- Timeout: 10 секунд
- Retries: 3
- Start period: 10 секунд

## 🔒 Security Headers

Настроены в `nginx.conf`:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy`

## 📊 Мониторинг

В Dokploy вы можете:
- Просматривать логи: `docker-compose logs -f`
- Проверять статус: `docker-compose ps`
- Мониторить ресурсы через веб-интерфейс Dokploy

## 🐛 Troubleshooting

### Проблема: Контейнер не запускается
**Решение**: Проверьте логи в Dokploy, убедитесь что порт 80 свободен

### Проблема: Сайт показывает 404
**Решение**: Проверьте, что папка `out/` создана после `npm run build`

### Проблема: Изображения не загружаются
**Решение**: Убедитесь, что `images: { unoptimized: true }` в `next.config.js`

### Проблема: Security headers не работают
**Решение**: Headers настроены в nginx.conf и работают на уровне сервера

## 📝 Дополнительная информация

- **Размер образа**: ~50-70 MB (благодаря многоэтапной сборке)
- **Время сборки**: ~2-5 минут
- **Память**: ~50-100 MB в runtime
- **CPU**: Минимальная нагрузка (статический сайт)

## ✅ Готово к деплою!

Все файлы настроены и готовы. Просто подключите репозиторий в Dokploy и запустите деплой.
