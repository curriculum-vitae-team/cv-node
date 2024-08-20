import { Module } from "@nestjs/common";
import { SkillCategoriesResolver } from "./skill_categories.resolver";

@Module({
  imports: [],
  providers: [SkillCategoriesResolver],
  exports: [],
})
export class SkillCategoriesModule {}
