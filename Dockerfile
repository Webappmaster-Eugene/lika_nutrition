# Многоэтапная сборка для оптимизации размера образа
FROM node:20-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package.json package-lock.json* ./

# Установка зависимостей (используем npm install если нет package-lock.json)
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Копирование исходного кода
COPY . .

# Установка переменных окружения для сборки (если нужно)
ARG NEXT_PUBLIC_SITE_URL=https://likanutrition.ru
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Сборка приложения
RUN npm run build

# Проверка, что папка out создана
RUN test -d out || (echo "ERROR: out directory not found after build" && exit 1)

# Финальный этап - nginx для статического контента
FROM nginx:alpine

# Установка wget для healthcheck
RUN apk add --no-cache wget

# Копирование собранных статических файлов
COPY --from=builder /app/out /usr/share/nginx/html

# Копирование конфигурации nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Создание директории для логов
RUN mkdir -p /var/log/nginx

# Открытие порта 80
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]
