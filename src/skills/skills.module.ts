import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SkillModel } from "./model/skill.model";
import { SkillsResolver } from "./skills.resolver";
import { SkillsService } from "./skills.service";
import { SkillCategoryModel } from "src/skill_categories/model/skill_category.model";
import { SkillCategoriesModule } from "src/skill_categories/skill_categories.module";

@Module({
  imports: [TypeOrmModule.forFeature([SkillModel, SkillCategoryModel]), SkillCategoriesModule],
  providers: [SkillsResolver, SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
