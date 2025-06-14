# Шаг 1: Сборка
FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN pnpm install && pnpm turbo run build --filter=web

# Шаг 2: Запуск
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/package.json .
COPY --from=builder /app/apps/web/public ./public
RUN npm install next

CMD ["npm", "run", "start"]