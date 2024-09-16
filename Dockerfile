ARG NODE_VERSION=20.17.0

FROM node:${NODE_VERSION}-slim AS base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base AS build

# Option if your running into OOM
# ENV NODE_OPTIONS=--max_old_space_size=1536

COPY --link package.json package-lock.json /src/
RUN npm install --production=false

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
