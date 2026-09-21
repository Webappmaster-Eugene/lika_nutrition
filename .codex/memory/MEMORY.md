# Память проекта «Лика Нутрициолог»

Проверено 2026-09-21. Только устойчивые факты; текущие проверки перепроверять.

- Workspace: 109.lika-visitka; Git, npm и весь код находятся в app/.
  Родительская папка не Git. Репозиторий — Webappmaster-Eugene/lika_nutrition.
- Владелец разрешил локальную настройку Codex и необходимые доступы в проекте.
  Профиль lika разрешает запись проекта, .git/.codex/.agents и сеть без запросов.
  Текущая управляемая сессия может иметь более строгую политику; конфиг её не отменяет.
- Источник полной инструкции: ../CLAUDE.md; копия .codex/context/CLAUDE.md.
  Исходные скиллы: .claude/skills. Роли: ../expert_info/lika/agents с копией в
  .codex/context/lika/agents.
- Пакетный менеджер npm (package-lock.json). Node 20+ (в Dockerfile node:20-alpine).
- Next.js 14 App Router со статическим экспортом: next.config.js задаёт
  output: 'export', trailingSlash: true, images.unoptimized. Сервера в рантайме нет:
  route handlers, middleware, ISR и серверные экшены не работают.
- Автотестов в проекте нет. Реальные проверки: npm run lint, npm run typecheck,
  npm run build. Сборка секретов не требует.
- Формы отправляются в Telegram прямо из браузера: токен и chat id приходят из
  NEXT_PUBLIC_* и попадают в клиентский бандл. Это известное свойство статической
  сборки, а не случайная утечка; считать эти значения публичными.
- Прод: Dokploy, домен likanutrition.ru, образ nginx:alpine со статикой из out/.
  Push в main = выкат. Известный баг Dokploy: контейнер может не попасть в
  dokploy-network, Traefik отдаёт 502 — лечится docker network connect.
  Имя контейнера содержит меняющийся хеш, находить динамически.
- Локальный MCP-конфиг может содержать credentials: адаптер читает их при запуске
  и не копирует в Git, память и отчёты.

## Продолжение работы

Состояние незавершённой задачи хранить в .codex/state/handoff.md, без секретов.
Перед финалом проверить git diff, выполнить self-review и подходящие проверки.
После изменения источников Claude выполнить npm run codex:sync и npm run codex:doctor.
