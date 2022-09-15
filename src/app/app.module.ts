import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { ProfileModule } from "../profile/profile.module";
import { DepartmentsModule } from "src/departments/departments.module";
import { PositionsModule } from "src/positions/positions.module";
import { LanguagesModule } from "../languages/languages.module";
import { SkillsModule } from "src/skills/skills.module";
import { CvsModule } from "../cvs/cvs.module";
import { ProjectsModule } from "../projects/projects.module";
import { JwtGuard } from "src/auth/jwt.guard";
import { RolesGuard } from "./roles.guard";
import { ComplexityPlugin } from "./complexity.plugin";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      cache: "bounded",
      playground: true,
      introspection: true,
      cors: true,
      path: "/api/graphql",
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
    ProfileModule,
    DepartmentsModule,
    PositionsModule,
    LanguagesModule,
    SkillsModule,
    ProjectsModule,
    CvsModule,
  ],
  providers: [
    ComplexityPlugin,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
