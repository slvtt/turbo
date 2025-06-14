# .docker/Dockerfile
ARG BUILD_DIR
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm turbo run build

FROM node:18-alpine
WORKDIR /app

# Web App
COPY --from=builder ${BUILD_DIR}/web/.next/standalone ./web/
COPY --from=builder ${BUILD_DIR}/web/public ./web/public
COPY --from=builder ${BUILD_DIR}/web/.next/static ./web/.next/static

# Docs App
COPY --from=builder ${BUILD_DIR}/docs/.next/standalone ./docs/
COPY --from=builder ${BUILD_DIR}/docs/public ./docs/public
COPY --from=builder ${BUILD_DIR}/docs/.next/static ./docs/.next/static

# Entrypoint скрипт
COPY deploy/docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]