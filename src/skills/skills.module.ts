import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SkillModel } from "./model/skill.model";
import { SkillsResolver } from "./skills.resolver";
import { SkillsService } from "./skills.service";

@Module({
  imports: [TypeOrmModule.forFeature([SkillModel])],
  providers: [SkillsResolver, SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
