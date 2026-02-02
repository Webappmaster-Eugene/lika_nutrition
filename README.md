# Лендинг нутрициолога Лики

Современный SEO-оптимизированный лендинг для нутрициолога, построенный на Next.js 14+ с App Router и полной поддержкой Static Site Generation (SSG).

## 🚀 Особенности

- **SEO-оптимизация**: Полная поддержка SSG, автоматическая генерация sitemap.xml и robots.txt
- **Структурированные данные**: JSON-LD разметка для лучшей индексации поисковыми системами
- **Блог**: Статическая генерация страниц блога из Markdown файлов
- **Формы**: Интеграция с Telegram Bot API для отправки заявок
- **Адаптивный дизайн**: Mobile-first подход с современным UI
- **Отзывы**: Галерея скриншотов отзывов клиентов
- **Производительность**: Оптимизированные изображения и быстрая загрузка

## 📋 Требования

- Node.js 18+ 
- npm или yarn

## 🛠️ Установка

1. Клонируйте репозиторий или откройте проект
2. Установите зависимости:

```bash
npm install
```

3. Скопируйте `.env.local.example` в `.env.local` и заполните переменные:

```bash
cp .env.local.example .env.local
```

Заполните переменные:
- `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` - токен Telegram бота (получить у @BotFather)
- `NEXT_PUBLIC_TELEGRAM_CHAT_ID` - ID чата для получения сообщений
- `NEXT_PUBLIC_SITE_URL` - URL вашего сайта

## 🚀 Запуск

### Режим разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Сборка для продакшена

```bash
npm run build
```

Статические файлы будут сгенерированы в директории `out/`.

### Запуск продакшен версии

```bash
npm start
```

## 📁 Структура проекта

```
91.lika-nutrition/
├── public/                 # Статические файлы
│   └── images/            # Изображения (testimonials, blog, services)
├── src/
│   ├── app/               # App Router (Next.js 14+)
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Главная страница
│   │   ├── blog/          # Блог
│   │   ├── services/      # Страница услуг
│   │   ├── about/         # О специалисте
│   │   ├── testimonials/  # Отзывы
│   │   ├── contact/       # Контакты
│   │   ├── sitemap.ts     # Автогенерация sitemap
│   │   └── robots.ts      # robots.txt
│   ├── components/        # React компоненты
│   │   ├── layout/        # Header, Footer, Navigation
│   │   ├── sections/      # Секции главной страницы
│   │   ├── forms/         # Формы
│   │   ├── ui/            # UI компоненты
│   │   └── blog/          # Компоненты блога
│   ├── lib/               # Утилиты и контент
│   │   ├── content/       # Контент (JSON, Markdown)
│   │   ├── utils/         # Утилиты
│   │   └── constants/      # Константы
│   └── types/             # TypeScript типы
└── scripts/                # Скрипты
    └── convert-docx.ts    # Конвертация .docx в контент
```

## 📝 Контент

### Извлечение контента из .docx

Для извлечения контента из файла `.docx`:

```bash
npm run convert-docx
```

Скрипт создаст файлы `extracted-content.txt` и `extracted-content.html` в `src/lib/content/`.

### Добавление статей в блог

Создайте файлы `.md` в `src/lib/content/blog/` со следующим форматом:

```markdown
---
title: "Заголовок статьи"
excerpt: "Краткое описание"
date: "2024-01-15"
image: "/images/blog/article.jpg"
tags: ["питание", "здоровье"]
---

Содержание статьи в формате Markdown...
```

### Добавление отзывов

Отредактируйте `src/lib/content/testimonials.ts` и добавьте пути к скриншотам отзывов в `public/images/testimonials/`.

### Настройка услуг

Отредактируйте `src/lib/content/services.ts` для изменения списка услуг.

## 🔧 Настройка Telegram бота

1. Создайте бота через [@BotFather](https://t.me/BotFather) в Telegram
2. Получите токен бота
3. Узнайте ваш Chat ID (можно использовать [@userinfobot](https://t.me/userinfobot))
4. Добавьте токен и Chat ID в `.env.local`

## 🎨 Кастомизация

### Цвета

Цветовая схема настраивается в `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Ваши цвета
  }
}
```

### Шрифты

Шрифты настраиваются в `src/app/layout.tsx`. По умолчанию используется Inter.

## 📦 Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Деплой произойдет автоматически

### Статический хостинг

После сборки (`npm run build`) загрузите содержимое директории `out/` на любой статический хостинг.

## 🔍 SEO

Проект включает:

- Автоматическую генерацию sitemap.xml
- robots.txt
- Структурированные данные (JSON-LD)
- Оптимизированные мета-теги
- Open Graph разметку

## 📄 Лицензия

Проект создан для личного использования.

## 🤝 Поддержка

Для вопросов и предложений свяжитесь через форму на сайте или Telegram.
