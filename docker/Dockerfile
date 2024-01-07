FROM amd64/node:18 as build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
COPY docker/.env.docker .env
RUN npm run build

FROM amd64/node:18-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
CMD ["node", "dist/src/main.js"]
