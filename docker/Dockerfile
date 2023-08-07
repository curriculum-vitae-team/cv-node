FROM amd64/node:18 as build
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
COPY docker/.env.docker .env
RUN yarn build

FROM amd64/node:18-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app /usr/src/app
CMD ["node", "dist/src/main.js"]
