const env = require("dotenv").config();
require("dotenv-expand").expand(env);

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { json } from "body-parser";
import { AppModule } from "./app/app.module";

async function start() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: "500kb" }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

start();
