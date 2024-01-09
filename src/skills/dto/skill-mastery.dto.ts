import { IsIn, IsOptional, IsString } from "class-validator";
import { SkillMasteryInput, Mastery } from "src/graphql";

const MASTERIES = ["Novice", "Advanced", "Competent", "Proficient", "Expert"];

export class SkillMasteryDto implements SkillMasteryInput {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsIn(MASTERIES)
  mastery: Mastery;
}
