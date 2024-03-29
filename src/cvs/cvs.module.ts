import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CvModel } from "./model/cv.model";
import { CvProjectModel } from "./model/cv-project.model";
import { UsersModule } from "../users/users.module";
import { ProjectsModule } from "../projects/projects.module";
import { CvsResolver } from "./cvs.resolver";
import { CvsService } from "./cvs.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([CvModel, CvProjectModel]),
    forwardRef(() => UsersModule),
    ProjectsModule,
  ],
  providers: [CvsResolver, CvsService],
  exports: [CvsService],
})
export class CvsModule {}
