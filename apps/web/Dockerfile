# Используем базовый образ с Node.js и pnpm
FROM node:18-alpine AS builder

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

WORKDIR /app
COPY . .

# Устанавливаем зависимости и собираем проект
RUN pnpm install && \
    pnpm turbo run build --filter=web

# Финальный образ
FROM node:18-alpine
WORKDIR /app

# Копируем только необходимые файлы
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]