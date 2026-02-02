# Решение проблем

## Проблема: MODULE_NOT_FOUND в режиме разработки

Если вы видите ошибку `Cannot find module './948.js'` или подобные ошибки в режиме разработки:

### Решение:

1. **Остановите dev сервер** (Ctrl+C)

2. **Очистите кеш Next.js:**
```bash
rm -rf .next
```

3. **Перезапустите dev сервер:**
```bash
npm run dev
```

### Альтернативное решение (если первое не помогло):

1. **Очистите все кеши:**
```bash
rm -rf .next
rm -rf node_modules/.cache
```

2. **Переустановите зависимости:**
```bash
rm -rf node_modules
npm install
```

3. **Перезапустите dev сервер:**
```bash
npm run dev
```

## Проблема: Ошибки сборки для production

Если `npm run build` не проходит:

1. **Проверьте версию Node.js:**
```bash
node --version  # Должна быть 18+
```

2. **Очистите кеш:**
```bash
rm -rf .next
rm -rf out
```

3. **Попробуйте собрать снова:**
```bash
npm run build
```

## Проблема: Docker сборка не проходит

1. **Проверьте Docker:**
```bash
docker --version
docker-compose --version
```

2. **Очистите старые образы:**
```bash
docker-compose down
docker system prune -f
```

3. **Соберите заново:**
```bash
docker-compose build --no-cache
```

## Проблема: Формы не отправляются

1. **Проверьте переменные окружения:**
   - `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN`
   - `NEXT_PUBLIC_TELEGRAM_CHAT_ID`

2. **Проверьте консоль браузера** на ошибки

3. **Проверьте Network tab** в DevTools

## Проблема: Изображения не загружаются

1. **Убедитесь что изображения в `public/images/`**

2. **Проверьте `next.config.js`:**
   - Должно быть `images: { unoptimized: true }`

3. **Проверьте пути к изображениям** в коде

## Проблема: Горизонтальная прокрутка на мобильных

1. **Проверьте что в `globals.css` есть:**
   - `overflow-x: hidden` на `html` и `body`
   - `max-width: 100vw` на `html` и `body`

2. **Проверьте что все контейнеры имеют:**
   - `w-full max-w-full overflow-x-hidden`

## Проблема: SEO метатеги не работают

1. **Проверьте переменные окружения:**
   - `NEXT_PUBLIC_SITE_URL` должен быть установлен

2. **Проверьте что в `layout.tsx` правильно настроены метаданные**

3. **Используйте инструменты:**
   - Google Rich Results Test
   - Facebook Sharing Debugger
   - Twitter Card Validator
