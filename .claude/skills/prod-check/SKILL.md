---
name: prod-check
description: Диагностика прода лендинга (likanutrition.ru) через SSH — Dokploy, контейнер, Traefik, nginx, DNS. Используй когда «сайт не открывается», «502 на likanutrition.ru», «проверь логи лендинга», «деплой прошёл, а сайта нет».
---

Подключись к проду и определи, что именно сломано. Прод — Dokploy-приложение типа **Docker Compose**, собранное из GitHub `Webappmaster-Eugene/lika_nutrition`, ветка `main`.

## Контекст

| Что | Значение |
|---|---|
| Домен | `likanutrition.ru` |
| Сервис в compose | `lika-nutrition` |
| Образ | многоэтапная сборка: `node:20-alpine` собирает `out/`, `nginx:alpine` отдаёт |
| Порты | публикация `3080:80`, внутренний порт контейнера — `80` |
| Сеть | `dokploy-network` (`external: true`), через неё Traefik находит контейнер |
| Healthcheck | `wget --spider http://localhost/` каждые 30 с |

Имя контейнера Dokploy собирает как `<проект>-<приложение>-<хеш>-lika-nutrition-1`, и **хеш меняется при пересоздании** — находи имя динамически, не полагайся на константу. На сервере живут чужие стеки: фильтруй по `lika-nutrition`.

Адрес сервера и ключ бери из уже настроенного SSH-окружения пользователя. Если доступ не настроен — скажи об этом прямо, не проси пароль и не выдумывай IP. Подробности деплоя — в `DOKPLOY_SETUP.md` репозитория.

## Шаги

### 1. Внешняя проверка — что видно снаружи

```bash
for u in https://likanutrition.ru/ https://likanutrition.ru/robots.txt https://likanutrition.ru/sitemap.xml; do
  curl -s -o /dev/null -w "%{http_code} $u\n" -L --max-time 20 "$u"
done
dig +short likanutrition.ru
dig +short www.likanutrition.ru
```

Как читать ответ:

| Что видно | Что это значит |
|---|---|
| `200` | Сайт жив, иди в шаг 4 — смотри содержимое, а не доступность |
| `502` | Traefik нашёл роутер, но не нашёл контейнер в `dokploy-network`. Шаг 3 — это известный баг Dokploy |
| `404` с телом `404 page not found` | Ответ Traefik: роутера для домена нет, контейнер не запущен. Шаг 2 |
| `404` от nginx | Контейнер жив, но в `out/` нет такого файла. Шаг 5 |
| `000` / таймаут | Сеть или DNS. A-запись домена должна указывать на IP сервера Dokploy |

Отдельно проверь `www`: если A-запись `www` смотрит на другой IP (в `DOKPLOY_SETUP.md` упомянут старый `65.108.228.42`), посетитель с `www.` попадёт не туда.

### 2. Контейнер не запущен

```bash
ssh <сервер> 'docker ps -a --format "{{.Names}}\t{{.Status}}" | grep -i lika-nutrition || echo "КОНТЕЙНЕРОВ НЕТ"'
```

Контейнеров нет — приложение снято с выката или деплой не дошёл до конца. Статус приложения и историю выкатов смотри в Dokploy (UI или его БД). Само оно не поднимется: Dokploy не перезапускает `idle`-приложения после перезагрузки сервера.

### 3. 502: контейнер не в сети Traefik

Известный баг Dokploy ([issue #3435](https://github.com/Dokploy/dokploy/issues/3435)): при деплое Docker Compose контейнер остаётся только в сети проекта и **не попадает в `dokploy-network`**, хотя в `docker-compose.yml` она объявлена внешней. Traefik смотрит только в `dokploy-network` и отдаёт 502.

```bash
ssh <сервер> 'NAME=$(docker ps --format "{{.Names}}" | grep lika-nutrition | head -1); echo "$NAME"; docker inspect -f "{{range \$k,\$v := .NetworkSettings.Networks}}{{\$k}} {{end}}" "$NAME"'
```

Если `dokploy-network` в списке нет — это и есть причина. Подключение сети меняет прод, поэтому **спроси подтверждение пользователя**, и только потом:

```bash
ssh <сервер> 'docker network connect dokploy-network <имя_контейнера>'
```

Лечение временное: после каждого следующего деплоя оно повторится. В отчёте так и скажи — постоянное решение лежит в настройке домена через вкладку Domains в Dokploy.

### 4. Логи и состояние контейнера

```bash
ssh <сервер> 'docker logs $(docker ps -qf name=lika-nutrition) --tail 200 2>&1'
ssh <сервер> 'docker inspect -f "{{.State.Health.Status}}" $(docker ps -qf name=lika-nutrition)'
```

Это nginx со статикой: в логах должны быть только запросы. `unhealthy` при живом контейнере — nginx не отдаёт `/`, то есть в образ не попал `out/` (шаг 5). Ошибки сборки Next здесь уже не видны: сборка происходит на этапе `builder` и её логи живут в Dokploy, а не в контейнере.

### 5. Содержимое: дошла ли статика

```bash
ssh <сервер> 'docker exec $(docker ps -qf name=lika-nutrition) ls /usr/share/nginx/html | head -20'
ssh <сервер> 'docker exec $(docker ps -qf name=lika-nutrition) ls /usr/share/nginx/html/blog 2>/dev/null | head'
ssh <сервер> 'docker exec $(docker ps -qf name=lika-nutrition) wget -qO- http://localhost/ | head -5'
```

Пусто или нет `index.html` — образ собран из неудачной сборки. Страница есть в репозитории, но нет здесь — у неё нет статического представления: серверный код или динамический сегмент без `generateStaticParams`.

Проверка изнутри отвечает, а снаружи 502 — проблема в маршрутизации (шаг 3), а не в приложении.

### 6. Перезапуск и деплой

Любое действие ниже **меняет прод — спроси подтверждение у пользователя перед запуском.**

```bash
ssh <сервер> 'cd /etc/dokploy/compose/<приложение>/code && docker compose up -d'
```

Полный деплой (пересборка из GitHub) делается **из Dokploy UI** — так обновится и статус приложения, и метки Traefik. После пересборки заново проверь принадлежность контейнера к `dokploy-network` (шаг 3).

Перед сборкой посмотри запас ресурсов:

```bash
ssh <сервер> 'free -h; df -h /'
```

## Что стоит проверить заодно

- `NEXT_PUBLIC_SITE_URL` в настройках приложения Dokploy. Она нужна **на этапе сборки**: если её нет, в `sitemap.xml`, `robots.txt` и canonical уедет дефолтный домен из кода.
- Security headers отдаёт nginx (`nginx.conf`), а не приложение: `curl -sI https://likanutrition.ru/ | grep -i x-frame` подтверждает, что конфиг попал в образ.
- Кеш статики — `expires 1y` с `immutable`. После выката старый файл может жить в браузере посетителя; это не поломка деплоя.

## Итог

Заверши отчётом в форме: **что не работает → почему (с доказательством из вывода команд) → что предлагается сделать**. Не предлагай перевыкат как первое действие, пока причина не названа: перевыкат стирает следы, а в этом проекте ещё и возвращает баг с сетью.
