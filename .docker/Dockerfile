# .docker/Dockerfile
ARG APP_NAME

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm turbo run build --filter=${APP_NAME}

FROM node:18-alpine
WORKDIR /app

# Копируем только нужное приложение
COPY --from=builder /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder /app/apps/${APP_NAME}/public ./public
COPY --from=builder /app/apps/${APP_NAME}/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]