FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install && pnpm turbo run build --filter=api
CMD ["node", "dist/index.js"]