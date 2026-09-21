# Лендинг нутрициолога Лики Надточеевой

SEO-лендинг с блогом: Next.js 14 App Router, собранный в статику
(`output: 'export'`) и отданный nginx из Docker-образа. Контент лежит кодом в
`src/lib/content/`. Код живёт во вложенном Git-репозитории `app/`; родительская
папка `109.lika-visitka` — рабочий каталог, в Git она не входит.

Отвечай по-русски. Тексты интерфейса — тоже по-русски.

## 1. Где что лежит

| Что | Где |
|---|---|
| Git-репозиторий, все команды | `app/` |
| Страницы | `app/src/app/` — `page.tsx`, `about/`, `services/`, `blog/`, `offer/`, `privacy/` |
| Корневой layout, метаданные, JSON-LD | `app/src/app/layout.tsx` |
| Карта сайта и robots | `app/src/app/sitemap.ts`, `app/src/app/robots.ts` |
| Секции главной | `app/src/components/sections/` |
| UI-примитивы | `app/src/components/ui/` |
| Формы | `app/src/components/forms/`, отправка — `app/src/lib/utils/formSubmission.ts` |
| Контент: услуги, отзывы, процесс, тексты | `app/src/lib/content/` |
| Статьи блога (Markdown) | `app/src/lib/content/blog/*.md` |
| Константы SEO и соцсетей | `app/src/lib/constants/` |
| Типы | `app/src/types/` |
| Изображения | `app/public/images/` |
| Деплой | `app/Dockerfile`, `app/docker-compose.yml`, `app/nginx.conf`, `app/DOKPLOY_SETUP.md` |
| Инфраструктура агентов | `app/scripts/codex/`, `app/docs/CODEX.md` |

## 2. Команды

Пакетный менеджер — npm (`package-lock.json`). Node 20+ (в образе `node:20-alpine`).

```sh
npm run dev
npm run lint
npm run typecheck
npm run build        # статический экспорт в out/
npm run smoke        # lint + typecheck + build, в этом порядке
```

Порядок в `smoke` не случайный: линтер и типы отрабатывают за секунды, сборка —
минуты. Ставить сборку первой значит долго ждать ради неиспользованного импорта.

```sh
npm run docker:build
npm run docker:up
npm run docker:logs
```

**Автотестов в проекте нет.** Это значит не «тесты пройдены», а «такой проверки
не существует». Сквозная проверка здесь одна — `npm run build`: она проходит по
всем страницам и падает на сломанном экспорте. Визуальные изменения дополнительно
смотри в браузере.

Скрипты `convert-docx` и `docker:test` ссылаются на отсутствующие в репозитории
`scripts/convert-docx.ts` и `test-docker.sh` — они не работают. Не чини их мимоходом
и не выдавай их отсутствие за поломку своей задачи.

## 3. Правила работы

**Push в `main` = деплой.** Прод собирается из ветки `main` репозитория
`Webappmaster-Eugene/lika_nutrition` через Dokploy. До push обязательны
`npm run smoke` и скилл `deploy-check`. Force push и `reset --hard` — только по
явной необходимости и с разрешения. Чужие незакоммиченные изменения в коммит
не включать.

**Сервера в рантайме нет.** `next.config.js` задаёт `output: 'export'`. Route
handlers, `middleware.ts`, серверные экшены, ISR и `revalidate` в этой сборке не
работают: сборка либо упадёт, либо молча выкинет страницу. Динамический сегмент
обязан иметь `generateStaticParams` — так живёт `blog/[slug]`.

**`NEXT_PUBLIC_*` видно посетителю.** Эти значения инлайнятся в клиентский бандл
на этапе сборки. Телеграм-токен форм уже такой — считать его публичным и не
добавлять рядом ничего чувствительнее. Остальные секреты — только из
`process.env` серверной части, которой здесь нет.

**Изменения прода — только с подтверждением пользователя.** Перевыкат стирает
следы и возвращает баг с сетью Dokploy: сначала назови причину, потом предлагай
действие.

## 4. Соглашения кода

- TypeScript strict. `any` и non-null assertion не использовать: линтер
  (`next/core-web-vitals`) их не ловит, ответственность на авторе.
- React 18, App Router. Серверные компоненты по умолчанию; `'use client'` — только
  там, где нужны состояние, эффект или Framer Motion.
- Одинарные кавычки, без точек с запятой, 2 пробела — как в существующих файлах.
- Импорты через алиас `@/…` (объявлен в `tsconfig.json`), а не `../../..`.
- Тексты, цены и услуги — в `src/lib/content/`, а не внутри компонентов: там их
  ищет владелец сайта.
- Статья блога — Markdown в `src/lib/content/blog/` с frontmatter `title`,
  `excerpt`, `date`, `image`, `tags`.
- Метаданные — через экспорт `metadata` или `generateMetadata`, JSON-LD — через
  `StructuredData` и `getStructuredDataGraph`, а не ручными тегами в разметке.
- Переиспользуй примитивы из `src/components/ui` (`Button`, `Card`, `Modal`,
  `SectionHeading`) вместо новых одноразовых.
- Комментарии узкие и только «почему». «Что делает» видно из кода.
- Ошибки не проглатывать молча: пользователь формы должен увидеть внятный текст.
  Пустой `catch` — дефект, а не стиль.
- Коммиты: `type(scope): суть по-русски`, в настоящем времени.

## 5. SEO

Это основная функция сайта, а не украшение.

- Новая страница: свой экспорт `metadata` с уникальными `title` и `description`,
  строка в `src/app/sitemap.ts` и ссылка в навигации `Header`.
- В конфиге включён `trailingSlash: true`. Адреса в `sitemap.ts` заканчиваются
  слэшем; расхождение даёт редирект и дубль в индексе.
- Домен берётся из `NEXT_PUBLIC_SITE_URL`; при пустой переменной подставляется
  дефолт `https://likanutrition.ru`. Проверяешь `sitemap.xml`, `robots.txt` или
  canonical — задавай переменную явно, иначе результат ничего не доказывает.
- JSON-LD не должен противоречить тексту страницы: выдуманные рейтинги, отзывы
  и цены в разметке хуже их отсутствия.
- `images.unoptimized: true` — Next картинки не пережимает. В браузер уедет ровно
  тот файл, что лежит в `public/images/**`; вес правит автор.

## 6. Прод

| Что | Значение |
|---|---|
| Хостинг | Dokploy, приложение типа Docker Compose |
| Домен | `likanutrition.ru` |
| Сервис | `lika-nutrition`, публикация `3080:80`, внутри nginx на `80` |
| Образ | `node:20-alpine` собирает `out/`, `nginx:alpine` отдаёт статику |
| Сеть | `dokploy-network` (`external: true`) |

Известный баг Dokploy ([#3435](https://github.com/Dokploy/dokploy/issues/3435)):
после деплоя Docker Compose контейнер может не попасть в `dokploy-network`, и
Traefik отдаёт 502. Лечится `docker network connect dokploy-network <контейнер>`
и повторяется после каждого выката. Имя контейнера содержит меняющийся хеш —
находить динамически.

Новая переменная окружения должна попасть в три места сразу: `.env.example`,
`docker-compose.yml` и Dokploy UI; `NEXT_PUBLIC_*` — ещё и как `ARG` в
`Dockerfile`, иначе в браузере будет `undefined`.

Диагностика прода — скилл `prod-check`, подробности деплоя — `app/DOKPLOY_SETUP.md`.

## 7. Скиллы

Источник методологии — `app/.claude/skills/`:

- `self-review` — строгая проверка собственных изменений перед коммитом;
- `deploy-check` — преддеплойная проверка, вердикт READY или BLOCKED;
- `prod-check` — диагностика прода по SSH.

Codex видит те же скиллы через адаптеры в `app/.agents/skills/` — они читают
оригиналы, а не пересказывают их. После изменения скиллов, настроек Claude или
документов `expert_info/lika/` нужен `npm run codex:sync`.

Роли-субагенты определены в `expert_info/lika/agents/` и доступны Claude через
`.claude/agents`: `explorer`, `code-cartographer`, `rev-correctness`,
`rev-security`, `rev-seo`, `rev-ui`, `rev-perf`, `check-runner`.

## 8. Завершение работы

После изменений — `self-review` и относящиеся к ним проверки. Не выдумывай
замечания ради фиксированного количества: исправляй подтверждённые дефекты,
остальное перечисли как наблюдения.

В итоговом ответе: что сделано, какие проверки реально выполнены и что осталось
непроверенным. Недоступный инструмент, отсутствующая переменная окружения или
несуществующий тестовый набор — это пропущенная проверка, а не пройденная; так
и пиши.
