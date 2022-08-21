## Local Environment

These variables are recommended for local development:

```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://postgres:123@localhost:5432/postgres
JWT_SECRET=
```

## Local Database

You should have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
Then you can use:

### `docker compose up`

Creates docker container with local PostgreSQL database.

## Available Scripts

In the project directory, you can run:

### `yarn schema`

Creates type definitions for GraphQL.

### `yarn watch`

Runs the app in the development mode.\
Open [http://localhost:3000/api/graphql](http://[::1]:3000/api/graphql) to access GraphQL playground.

### `yarn build`

Builds the app for production to the `dist` folder.

## Production

It is up to you. Any Node.js & PostgreSQL supported service will work.\
Currently deployed on [Heroku](https://cv-gen-be.herokuapp.com/api/graphql).
