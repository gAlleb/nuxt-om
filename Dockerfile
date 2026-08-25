# Nuxt 4 требует Node ^22.19 || ^24.11 || >=26
ARG NODE_VERSION=22.19.0

FROM node:${NODE_VERSION}-slim AS base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base AS build

# Option if your running into OOM
# ENV NODE_OPTIONS=--max_old_space_size=1536

# better-sqlite3 (нужен @nuxt/content v3) — нативный модуль, в slim-образе
# нет компилятора, поэтому ставим инструменты сборки только на этапе build.
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
 && rm -rf /var/lib/apt/lists/*

COPY --link package.json package-lock.json .npmrc /src/
RUN npm ci --production=false --no-audit --no-fund

COPY --link . /src


RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT
EXPOSE $PORT
COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
