FROM node:18.16 as build-step
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
COPY docker/.env.docker .env
RUN yarn build

EXPOSE 80
CMD ["node", "dist/src/main.js"]
