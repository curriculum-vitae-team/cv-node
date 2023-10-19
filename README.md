## Local Environment

These variables are recommended for local development:

```
PORT=3001
DATABASE_URL="postgres://postgres:123@localhost:5432/postgres"
JWT_SECRET=
CLOUDINARY_URL=
MAIL_FROM=
SMTP_URL=
```

## Local Database & Docker

You should have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
Then you can use:

### `yarn image`

Creates docker image for this application.

### `yarn image:up`

Creates docker container with local PostgreSQL database. You can inspect database table entities with pgAdmin 4.\
Runs previously created image in another docker container connected to the database.

## Available Scripts

In the project directory, you can run:

### `yarn schema`

Creates type definitions for GraphQL.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3001/api/graphql](http://[::1]:3001/api/graphql) to access GraphQL playground.

### `yarn build`

Builds the app for production to the `dist` folder.

## Production

https://cv-project-js.inno.ws/api/graphql \
Application should be exposed on port 80.
