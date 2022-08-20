import { IsIn, IsString } from "class-validator";
import { SkillMasteryInput } from "src/graphql";

export class SkillMasteryDto implements SkillMasteryInput {
  @IsString()
  skill_name: string;

  @IsString()
  @IsIn(["novice", "advanced", "competent", "proficient", "expert"])
  mastery: string;
}
