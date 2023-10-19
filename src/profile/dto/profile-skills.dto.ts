import { IsArray, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProfileSkillsInput } from "src/graphql";
import { SkillMasteryDto } from "src/skills/dto/skill-mastery.dto";

export class ProfileSkillsDto implements ProfileSkillsInput {
  @IsString()
  profileId: string;

  @IsArray()
  @ValidateNested()
  @Type(() => SkillMasteryDto)
  skills: SkillMasteryDto[];
}
