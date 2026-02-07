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
2. Порт 3080 свободен (по умолчанию приложение публикуется на 3080, чтобы не конфликтовать с другими сервисами на 3000)

### Быстрая проверка:
```bash
./test-docker.sh
```

### Ручная проверка:
Перед запуском создайте сеть (для совместимости с docker-compose.yml):  
`docker network create dokploy-network`  
(если сети нет, `docker-compose up` выдаст ошибку о внешней сети.)
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
# http://localhost:3080

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

**Опциональные (SEO и верификация):**
- `NEXT_PUBLIC_GOOGLE_VERIFICATION` = код верификации из Google Search Console (если не задан, meta-тег верификации не выводится)
- `NEXT_PUBLIC_YANDEX_VERIFICATION` = код верификации из Yandex Webmaster (если не задан, meta-тег верификации не выводится)

**Опциональные (формы):**
- `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` = (токен Telegram бота для форм)
- `NEXT_PUBLIC_TELEGRAM_CHAT_ID` = (ID чата для получения сообщений)

**Важно:** Все переменные с префиксом `NEXT_PUBLIC_` должны быть установлены во время сборки Docker образа. В Dokploy они автоматически передаются в процесс сборки.

### Шаг 4: Настройка портов
- По умолчанию в `docker-compose.yml` задано **3080:80** (хост:контейнер). При доступе по домену через Traefik порт публикации не важен. Если нужен другой хост-порт — измените в `docker-compose.yml` или в настройках приложения в Dokploy.
- **Внутренний порт контейнера**: 80 (nginx).

### Шаг 5: Деплой
Нажмите "Deploy" в Dokploy. Процесс включает:
1. Клонирование репозитория
2. Сборку Docker образа
3. Запуск контейнера через docker-compose
4. Проверку healthcheck

Для маршрутизации по домену через Traefik сервис в `docker-compose.yml` подключён к сети **dokploy-network** (`external: true`). Без этого Traefik не видит контейнер и по домену будет 502 Bad Gateway.

## 🔍 Проверка после деплоя

1. **Основной сайт**: `https://likanutrition.ru/`
2. **robots.txt**: `https://likanutrition.ru/robots.txt`
3. **sitemap.xml**: `https://likanutrition.ru/sitemap.xml`
4. **Security headers**: проверьте через https://securityheaders.com/
5. **Изображения**: убедитесь, что все изображения загружаются

### SEO и разметка

- **OG/Twitter изображения:** для соцсетей используется изображение из `public/images/about/nutritionist.jpg`. Для лучшего отображения в соцсетях рекомендуется добавить отдельные баннеры 1200×630 px в `public/images/`: `og-image.jpg` и при необходимости `twitter-card.jpg`, после чего обновить пути в `src/app/layout.tsx` (openGraph.images, twitter.images).
- **Проверка разметки:** после деплоя проверьте структурированные данные в [Яндекс Валидаторе](https://yandex.ru/support/webmaster/yandex-indexing/validator.html) и [Google Rich Results Test](https://search.google.com/test/rich-results). Отправьте sitemap в Яндекс.Вебмастер и Google Search Console.
- **Core Web Vitals:** через 1–2 недели после запуска проверьте LCP, INP и CLS в Search Console и [PageSpeed Insights](https://pagespeed.web.dev/).

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

### Проблема: Сайт https://likanutrition.ru/ недоступен после успешного деплоя

Деплой и контейнер работают, но по домену сайт не открывается. Обычно причина — **DNS или маршрутизация**.

**1. DNS: куда смотрит домен**

- В панели DNS у домена **likanutrition.ru** должна быть **A‑запись** (корень, без поддомена), и её **значение** — **публичный IP сервера, на котором запущен Dokploy** (тот же хост, где крутится контейнер).
- Узнать IP сервера Dokploy: в панели хостинга/VPS, или на самом сервере: `curl -s ifconfig.me`.
- Если A‑запись указывает на другой IP (например, старый хостинг или другой сервер), браузер ходит не на тот сервер — замените значение A‑записи на IP сервера Dokploy.
- Распространение DNS — до 24–48 часов; часто 5–15 минут.

**2. Поддомен www**

- Сейчас **www.likanutrition.ru** может указывать на другой IP (например, 65.108.228.42). Если нужно, чтобы и **www** открывал этот же сайт, добавьте или измените A‑запись для **www** на тот же IP, что и для корня **likanutrition.ru**, либо настройте CNAME `www` → `likanutrition.ru`.

**3. Сервер и Traefik**

- На сервере Dokploy должны быть открыты порты **80** и **443** (фаервол/security group).
- Должен быть запущен **Traefik** (или другой reverse proxy), который слушает 80/443 и по правилу `Host(\`likanutrition.ru\`)` направляет трафик в контейнер (порт 80). В `docker-compose.yml` это задано через labels.
- В Dokploy в разделе **Domains** (если есть) проверьте, что домен **likanutrition.ru** привязан к этому приложению.

**4. Быстрая проверка**

- С сервера Dokploy: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3080/` — должен вернуть 200 (сайт отдаётся локально).
- С вашего компьютера: `curl -v https://likanutrition.ru/` — смотрите, на какой IP идёт запрос (должен быть IP сервера Dokploy) и какой ответ (timeout, connection refused, 502 и т.д.).

### Проблема: 502 Bad Gateway на https://likanutrition.ru/
**Причина:** Traefik получает запрос по домену, но не может достучаться до контейнера — приложение и Traefik в разных Docker-сетях. Контейнер должен быть в сети **dokploy-network**, в которой работает Traefik в Dokploy.
**Решение:** В `docker-compose.yml` сервис должен быть подключён к сети `dokploy-network`, а в конце файла задано: `networks: dokploy-network: external: true`. Без этого Traefik не видит контейнер и возвращает 502. После правок сделайте повторный деплой и подождите 10–30 секунд (генерация сертификата Let's Encrypt).

### Проблема: `Bind for 0.0.0.0:3000 failed: port is already allocated`
**Причина:** На хосте уже занят порт, который пытается занять контейнер. В текущей конфигурации используется порт **3080** (не 3000), поэтому такая ошибка может появиться, если в `docker-compose.yml` или в настройках Dokploy указан порт, занятый другим сервисом.
**Решение:** Убедитесь, что выбранный для публикации порт свободен. При необходимости измените маппинг в `docker-compose.yml` (например, на `"3081:80"`) или укажите другой порт в настройках приложения в Dokploy, если интерфейс это позволяет.

### Проблема: Контейнер не запускается
**Решение**: Проверьте логи в Dokploy, убедитесь что порт публикации (по умолчанию 3080) свободен

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
