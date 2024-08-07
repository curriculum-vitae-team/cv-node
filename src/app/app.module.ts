import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { ProfileModule } from "../profile/profile.module";
import { CloudModule } from "src/cloud/cloud.module";
import { DepartmentsModule } from "src/departments/departments.module";
import { PositionsModule } from "src/positions/positions.module";
import { LanguagesModule } from "../languages/languages.module";
import { SkillsModule } from "src/skills/skills.module";
import { CvsModule } from "../cvs/cvs.module";
import { CvProjectsModule } from "src/cv_projects/cv_projects.module";
import { ProjectsModule } from "../projects/projects.module";
import { MailModule } from "src/mail/mail.module";
import { Void } from "./void.scalar";
import { RolesGuard } from "./guards/roles.guard";
import { ComplexityPlugin } from "./complexity.plugin";
import { AccessTokenGuard } from "src/auth/guards/access_token.guard";

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
      resolvers: {
        Void,
      },
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
    CloudModule,
    ProfileModule,
    DepartmentsModule,
    PositionsModule,
    LanguagesModule,
    SkillsModule,
    ProjectsModule,
    CvsModule,
    CvProjectsModule,
    MailModule,
  ],
  providers: [
    ComplexityPlugin,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
