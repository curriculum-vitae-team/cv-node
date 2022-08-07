import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { LanguagesModule } from "../languages/languages.module";
import { CvsModule } from "../cvs/cvs.module";
import { ProjectsModule } from "../projects/projects.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      cache: "bounded",
      playground: true,
      cors: true,
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: "postgres",
      url: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL && { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    LanguagesModule,
    ProjectsModule,
    CvsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
