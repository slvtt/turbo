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
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000
CMD ["node", "apps/web/server.js"]