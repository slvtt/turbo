# Шаг 1: Сборка
FROM node:18-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY . .

# Устанавливаем зависимости только для нужного приложения
RUN pnpm install --filter=web
RUN pnpm turbo run build --filter=web

# Шаг 2: Финальный образ
FROM node:18-alpine
WORKDIR /app

# Копируем standalone-версию Next.js
COPY --from=builder /app/apps/docs/.next/standalone ./
COPY --from=builder /app/apps/docs/public ./public
COPY --from=builder /app/apps/docs/.next/static ./.next/static

# Копируем необходимые зависимости
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "server.js"]