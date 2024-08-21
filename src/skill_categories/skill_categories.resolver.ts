import { Query, Resolver } from "@nestjs/graphql";
import { SkillCategoriesService } from "./skill_categories.service";

@Resolver()
export class SkillCategoriesResolver {
  constructor(private readonly skillCategoriesService: SkillCategoriesService) {}

  @Query("skillCategories")
  skillCategories() {
    return this.skillCategoriesService.findAll();
  }
}
