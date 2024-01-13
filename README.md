## Local Environment

These variables are recommended for local development:

```
PORT="3001"
DATABASE_URL=
JWT_SECRET=
CLOUDINARY_URL=
MAIL_FROM=
SMTP_URL=
CHROME_WS=
```

## Local Database & Docker

You should have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
Then you can use:

### `npm run image`

Creates docker image for this application.

### `npm run image:up`

Creates docker container with local PostgreSQL database. You can inspect database table entities with pgAdmin 4.\
Runs previously created image in another docker container connected to the database.

## GraphQL SDL-first

This project use Schema-first approach.\
TypeScript output is published as npm package https://www.npmjs.com/package/cv-graphql.

## Available Scripts

In the project directory, you can run:

### `npm run schema`

Creates type definitions for GraphQL.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001/api/graphql](http://[::1]:3001/api/graphql) to access GraphQL playground.

### `npm run build`

Builds the app for production to the `dist` folder.

## Production

Current production URL https://cv-project-js.inno.ws/api/graphql. \
Application should be exposed on port 80.
