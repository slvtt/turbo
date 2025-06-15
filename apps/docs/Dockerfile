FROM node:18-alpine AS base

# Фиксируем версию pnpm, совпадающую с вашей локальной
ARG PNPM_VERSION=9.0.0

FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat git
WORKDIR /app

# Устанавливаем точную версию pnpm
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
COPY . .
RUN pnpm dlx turbo prune docs --docker

FROM base AS installer
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app


ARG PNPM_VERSION=9.0.0
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml .
COPY --from=builder /app/out/pnpm-workspace.yaml .

RUN pnpm install --frozen-lockfile || \
    { echo "Lockfile outdated, updating..."; pnpm install; }

COPY --from=builder /app/out/full/ .
RUN pnpm dlx turbo run build --filter=docs

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/.next/static ./apps/docs/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/docs/public ./apps/docs/public

CMD node apps/docs/server.js