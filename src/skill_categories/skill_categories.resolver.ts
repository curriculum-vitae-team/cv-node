import { Query, Resolver } from "@nestjs/graphql";

const enum SkillTypes {
  Frontend = "Frontend",
  Backend = "Backend",
  DevOps = "DevOps",
}

const SKILL_TYPES = [SkillTypes.Frontend, SkillTypes.Backend, SkillTypes.DevOps];

const SKILL_CATEGORIES = [
  { name: "Markdown languages" },
  { name: "Programming languages" },
  /* Frontend */
  { name: "Frontend technologies", type: SkillTypes.Frontend },
  { name: "State management libraries", type: SkillTypes.Frontend },
  { name: "Form libraries", type: SkillTypes.Frontend },
  { name: "UI libraries", type: SkillTypes.Frontend },
  { name: "Data visualization", type: SkillTypes.Frontend },
  { name: "Internationalization", type: SkillTypes.Frontend },
  /* Backend */
  { name: "Backend technologies", type: SkillTypes.Backend },
  { name: "Databases", type: SkillTypes.Backend },
  { name: "Cloud", type: SkillTypes.Backend },
  /* Testing */
  { name: "Testing frameworks and tools" },
  /* DevOps */
  { name: "CI/CD", type: SkillTypes.DevOps },
  { name: "Containerization", type: SkillTypes.DevOps },
  /* Other */
  { name: "Documentation" },
  { name: "Source control systems" },
  { name: "Graphic editors" },
];

@Resolver()
export class SkillCategoriesResolver {
  @Query("skillTypes")
  skillTypes() {
    return SKILL_TYPES;
  }

  @Query("skillCategories")
  skillCategories() {
    return SKILL_CATEGORIES;
  }
}
