#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { repo, sync } from "./harness.mjs";

const seed = (path, value) => {
  const target = join(repo, path);
  mkdirSync(dirname(target), { recursive: true });
  if (!existsSync(target)) writeFileSync(target, value);
};

seed(".codex/memory/MEMORY.md", `# Память проекта «Лика Нутрициолог»

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
`);

seed(".agents/skills/project-harness/SKILL.md", `---
name: project-harness
description: Настроить, проверить или восстановить локальную инфраструктуру Codex для лендинга, память, зависимости, MCP и паритет с Claude.
---

Работай из корня Git-репозитория app. Прочитай [руководство](../../../docs/CODEX.md).
Сначала npm run codex:doctor. После изменения источников — npm run codex:sync.
Для первого запуска или новой машины — npm run codex:setup после npm install.
Конфиги только локальные, глобальные ~/.codex не изменять.
Проверяй npm run codex:test и npm run lint. Для полного quality gate —
npm run codex:verify; он включает lint, typecheck и статическую сборку. Для MCP
handshake и tools/list — npm run codex:mcp-check; это не проверка токенов API и не
разрешение выполнять реальные операции с данными. Проверяй drift, читаемость ссылок
скиллов, загрузку ролей и конфига самим Codex через npm run codex:native-check.
При недоступном OAuth/Chrome честно обозначай, что требуется интерактивное подключение.
Проверки и логи сохраняются в .codex/state и не попадают в Git.
`);

const frontend = join(homedir(), ".claude/plugins/marketplaces/claude-plugins-official/plugins/frontend-design");
const skillTarget = join(repo, ".agents/skills/frontend-design");
if (!existsSync(join(skillTarget, "SKILL.md"))) {
  if (!existsSync(join(frontend, "skills/frontend-design/SKILL.md"))) throw new Error("Installed Claude frontend-design source is missing; restore its checked-in Codex copy.");
  mkdirSync(skillTarget, { recursive: true });
  writeFileSync(join(skillTarget, "SKILL.md"), readFileSync(join(frontend, "skills/frontend-design/SKILL.md"), "utf8") + "\n## Lika Nutrition project integration\n\nRead AGENTS.md. This is the landing site of the nutritionist Lika Nadtocheeva: Next.js 14 App Router exported as static HTML, React 18, Tailwind 3 with the palette in tailwind.config.js and the tokens in src/app/globals.css, Framer Motion for animation, and the existing primitives in src/components/ui. Interface copy is Russian. Preserve the current botanical visual language, the Inter/Playfair font pair and the accessibility attributes unless the task asks for a redesign. Do not add a component library for a small change. There is no server at runtime, so a change must work as plain exported HTML. Verify changed UI with npm run build plus a real browser through the chrome-devtools MCP: there are no component tests to rely on.\n");
  copyFileSync(join(frontend, "LICENSE"), join(skillTarget, "LICENSE.txt"));
}
sync();
