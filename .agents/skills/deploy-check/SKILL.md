---
name: deploy-check
description: "Преддеплойная проверка лендинга — линтер, типы, статический экспорт, SEO-артефакты, переменные окружения, Docker и секреты. Используй перед push в main и перед выкатом через Dokploy."
---

Прочитай [оригинальный workflow](../../../.claude/skills/deploy-check/SKILL.md) целиком и выполни его с адаптацией ниже. Пути src/, public/ и команды npm/git относятся к корню репозитория app. $ARGUMENTS означает запрос пользователя, не shell-переменную.

Команды выполняй через npm из корня репозитория app: npm run smoke — это lint, typecheck и build. npm run codex:verify дополнительно проверяет сам harness. Сборка статическая (output: 'export'), секретов не требует, но NEXT_PUBLIC_SITE_URL влияет на sitemap, robots и canonical: при пустом значении применяется дефолт https://likanutrition.ru — отметь это явно. Docker build выполняй при изменениях Dockerfile/nginx.conf/docker-compose.yml и доступном daemon. Push в main запускает выкат Dokploy.
