import { Module } from "@nestjs/common";
import { SkillCategoriesResolver } from "./skill_categories.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SkillCategoryModel } from "./model/skill_category.model";
import { SkillCategoriesService } from "./skill_categories.service";

@Module({
  imports: [TypeOrmModule.forFeature([SkillCategoryModel])],
  providers: [SkillCategoriesResolver, SkillCategoriesService],
  exports: [SkillCategoriesService],
})
export class SkillCategoriesModule {}
