require("dotenv").config();
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function start() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
start();
