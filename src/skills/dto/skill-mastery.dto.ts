import { IsIn, IsString } from "class-validator";
import { SkillMasteryInput, Mastery } from "src/graphql";

export class SkillMasteryDto implements SkillMasteryInput {
  @IsString()
  skill_name: string;

  @IsString()
  @IsIn(["Novice", "Advanced", "Competent", "Proficient", "Expert"])
  mastery: Mastery;
}
