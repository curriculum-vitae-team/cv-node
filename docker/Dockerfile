FROM amd64/node:18-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
COPY docker/.env.cv_node .env
RUN npm run build

FROM amd64/node:18-alpine AS launch
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
CMD ["node", "dist/src/main.js"]
