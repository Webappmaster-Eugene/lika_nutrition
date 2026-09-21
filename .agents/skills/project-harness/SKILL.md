---
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
