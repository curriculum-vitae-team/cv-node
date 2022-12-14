import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectModel } from "./model/project.model";
import { SkillsModule } from "src/skills/skills.module";
import { ProjectsResolver } from "./projects.resolver";
import { ProjectsService } from "./projects.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectModel]), SkillsModule],
  providers: [ProjectsResolver, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
