import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CvProjectModel } from "./model/cv_project.model";
import { ProjectsModule } from "../projects/projects.module";
import { CvProjectsResolver } from "./cv_projects.resolver";
import { CvProjectsService } from "./cv_projects.service";
import { CvModel } from "../cvs/model/cv.model";
import { CvsModule } from "src/cvs/cvs.module";

@Module({
  imports: [TypeOrmModule.forFeature([CvModel, CvProjectModel]), CvsModule, ProjectsModule],
  providers: [CvProjectsResolver, CvProjectsService],
  exports: [CvProjectsService],
})
export class CvProjectsModule {}
