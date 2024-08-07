import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CvModel } from "src/cvs/model/cv.model";
import { CvSkillsResolver } from "./cv_skills.resolver";
import { CvSkillsService } from "./cv_skills.service";
import { CvsModule } from "src/cvs/cvs.module";

@Module({
  imports: [TypeOrmModule.forFeature([CvModel]), CvsModule],
  providers: [CvSkillsResolver, CvSkillsService],
  exports: [CvSkillsService],
})
export class CvSkillsModule {}
