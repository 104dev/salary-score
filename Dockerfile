# syntax = docker/dockerfile:1

ARG NODE_VERSION=24.11.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Remix/Prisma"

# アプリは /app に置く
WORKDIR /app

# 本番環境フラグ
ENV NODE_ENV="production"


# =========================
#  Build stage
# =========================
FROM base AS build

# build 用に必要なパッケージ（node-gyp など）
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      node-gyp \
      openssl \
      pkg-config \
      python-is-python3 && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# 依存関係インストール（dev を含める）
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# ソース一式コピー（prisma ディレクトリも含まれる）
COPY . .

# ※ ここではもう prisma generate をしない
# RUN npx prisma generate  ← 削除

# アプリの build（react-router の build）
RUN npm run build

# （必要ならここで devDependencies を削ってもいいが、
#   runtime で npx prisma が必要なら dev を残す方がラク）
# RUN npm prune --omit=dev


# =========================
#  Final runtime stage
# =========================
FROM base

WORKDIR /app

# runtime で必要な最小限のパッケージ
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# build 済みアプリを全部コピー
COPY --from=build /app /app

# 本番サーバの LISTEN ポート
EXPOSE 3000

# ★ runtime で Prisma Client を生成してからアプリ起動
CMD ["sh", "-c", "npx prisma generate && npm run start"]