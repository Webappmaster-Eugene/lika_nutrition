# Codex в проекте лендинга

Настройка локальна для рабочего каталога `109.lika-visitka` и вложенного
репозитория `app`. Конфигурация живёт только в проекте; глобальный `~/.codex` и
настройки Claude не меняются. Штатный CLI хранит у себя лишь доверие к каталогам
и хеши hooks.

## Запуск

```sh
cd /path/to/109.lika-visitka/app
npm run codex:doctor
npm run codex
```

`npm run codex -- <аргументы Codex>` запускает CLI в рабочем каталоге и
предварительно проверяет источники конфигурации. При первом запуске подтверди
доверие к обеим папкам и к hooks через интерфейс Codex. В приложении или IDE
открывай `109.lika-visitka` либо `app` — инструкции и скиллы одинаковы в обоих
случаях. Изменение файлов не меняет разрешения уже запущенной сессии; политики
организации и runtime имеют приоритет.

Профиль `lika`: сеть включена, `approval_policy = never`, запись разрешена в
папке проекта, включая `.git`, `.codex`, `.agents`. Запись во весь домашний
каталог этим не разрешается. Кеш npm уводится в `.codex/state`.

## Что перенесено

| Возможность Claude | Эквивалент Codex |
| --- | --- |
| Полный `CLAUDE.md` | `AGENTS.md` + синхронизируемый `.codex/context/CLAUDE.md` |
| Проектные скиллы | `.agents/skills/*`: адаптеры читают оригиналы в `.claude/skills` |
| Плагин frontend-design | Локальная копия с лицензией и привязкой к UI проекта |
| Субагенты `.claude/agents` | `.codex/agents/*.toml` из тех же определений ролей |
| Контекст `expert_info/lika` | Копии в `.codex/context/lika` для отдельного checkout |
| Серверы `.mcp.json` | Проектные MCP в `.codex/config.toml`, credentials читает адаптер |
| WebStorm MCP | Подключение из текущего Claude-каталога, если оно настроено |
| Проверки качества | `npm run codex:verify` поверх `npm run smoke` |
| Продолжение и память | `.codex/memory/MEMORY.md`, локальный `.codex/state/handoff.md` |
| Восстановление контекста | Hook SessionStart, включая resume и compact |
| Проверка перед завершением | Hook Stop: drift источников и `git diff --check` |
| Диагностика инфраструктуры | `codex:doctor`, `codex:test`, `codex:mcp-check`, `codex:native-check` |

Имена моделей Claude не копируются: роли наследуют выбранную модель Codex.
Качество обеспечивают общие правила, self-review и фактические проверки. Hook
Stop не заменяет quality gate и не утверждает, что проверки прошли.

## Синхронизация и воспроизводимость

```sh
npm run codex:setup         # первичное создание памяти, скиллов и конфигурации
npm run codex:sync          # обновить контекст, адаптеры, роли и machine-specific config
npm run codex:doctor        # проверить drift и зависимости без сети
npm run codex:test          # проверить поведение самого harness
npm run codex:verify        # полный локальный набор проверок
npm run codex:mcp-check     # handshake + tools/list по каждому MCP
npm run codex:browser-check # реальный list_pages; в отчёте только статус и число вкладок
npm run codex:native-check  # фактическая загрузка config/skills/hooks/MCP самим Codex
```

На новой машине: `npm install` в `app`, затем `npm run codex:setup`. Нужен
Node.js 20+. `config.toml` содержит абсолютные пути этой машины и игнорируется
Git; шаблон, скрипты, скиллы, роли, безопасный контекст и начальная память
хранятся в Git. Источники и их SHA-256 перечислены в `.codex/sources.json`,
сгенерированные файлы — в `.codex/generated.json`. Секреты туда не копируются.
`.codex/state` содержит только локальные логи, отчёты и handoff и не попадает ни
в Git, ни в Docker-контекст.

`doctor` контролирует: drift источников Claude и сгенерированных файлов,
совпадение `config.toml` на обоих уровнях, наличие скиллов и читаемость ссылок
внутри них, ссылки рабочего каталога на `app`, наличие ролей, память, контекст,
установленные зависимости, доступность npm и версию Node.

Повторный `setup` сохраняет существующую память. Исчезнувшие исходные роли и
скиллы удаляются только при совпадении с предыдущей генерацией: локальные
изменения вызывают явный конфликт вместо потери файла. Эти сценарии покрыты
изолированным тестом, который создаёт временный checkout и намеренно портит его
файлы (`npm run codex:test`).

## Роли

Определения ролей лежат в `../expert_info/lika/agents/*.md` в формате субагентов
Claude (frontmatter `name`, `description`, `tools`) и одновременно служат
источником для `.codex/agents/*.toml`. Копия хранится в
`.codex/context/lika/agents` и используется, когда внешний каталог недоступен.
Роль без `Bash` в списке инструментов получает профиль `lika-review` — только
чтение и сеть. Ревьюеры не редактируют проект; findings требуют `файл:строка`,
severity, confidence и сценария сбоя.

## MCP и границы переноса

`codex:mcp-check` проверяет подключение и каталог инструментов, но не право
токена на реальную запись. Итог — `.codex/state/mcp-report.json`;
`codex:native-check` пишет `.codex/state/native-report.json`.

Определения берутся из `.mcp.json` рабочего каталога, затем `app/.mcp.json`,
затем `.codex/mcp.local.json` (файл игнорируется Git и переопределяет предыдущие).
Секреты из этих файлов попадают только в дочерний процесс MCP-сервера: в
`config.toml`, память и отчёты они не копируются, что проверяется тестом.

Chrome DevTools MCP использует уже запущенный браузер: в Chrome 144+ нужно
включить `chrome://inspect/#remote-debugging` и разрешить подключение. Это
согласие самого браузера, разрешениями Codex оно не заменяется. Для второго
профиля (например, Яндекс Браузера) добавь отдельный сервер с
`--userDataDir` в `.codex/mcp.local.json`. Cookies и сессии не извлекать.
После смены профиля перезапусти MCP: запущенный процесс хранит старые аргументы.
Пакет Claude `@anthropic-ai/mcp-chrome-devtools` в Codex не запускается —
адаптер подставляет вместо него `chrome-devtools-mcp@latest --autoConnect`.

Playwright MCP работает с отдельным профилем и не подтверждает состояние
личного браузера пользователя.

## Границы

`npm run codex:verify` включает `npm run build` — статический экспорт всех
страниц. Секретов сборке не нужно, но `NEXT_PUBLIC_SITE_URL` попадает в
`sitemap.xml`, `robots.txt` и canonical на этапе сборки: собранное без неё не
доказывает корректность адресов. Автотестов в проекте нет — `codex:test`
проверяет только сам harness, не приложение. Docker-сборка и состояние прода —
отдельные проверки, описанные в скиллах `deploy-check` и `prod-check`.

## Источники форматов

- [Проектные настройки Codex](https://learn.chatgpt.com/docs/config-file/config-advanced)
- [Permission profiles](https://learn.chatgpt.com/docs/permissions)
- [Skills](https://developers.openai.com/codex/skills)
- [Hooks и доверие к ним](https://learn.chatgpt.com/docs/hooks)
- [MCP](https://learn.chatgpt.com/docs/extend/mcp)
- [Подключение к открытому Chrome](https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/advanced-usage.md)
