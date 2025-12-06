FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app

# 依存とビルド成果物＋Prisma関連をコピー
COPY ./package.json package-lock.json ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build

COPY --from=build-env /app/prisma ./prisma
COPY --from=build-env /app/prisma.config.ts ./prisma.config.ts

COPY --from=build-env /app/public ./public

CMD ["npm", "run", "start"]