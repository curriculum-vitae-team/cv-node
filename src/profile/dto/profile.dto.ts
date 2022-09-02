import { IsArray, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProfileInput } from "src/graphql";
import { SkillMasteryDto } from "src/skills/dto/skill-mastery.dto";
import { LanguageProficiencyDto } from "src/languages/dto/language-proficiency.dto";

export class ProfileDto implements ProfileInput {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  departmentId: string;

  @IsString()
  positionId: string;

  @IsArray()
  @Type(() => SkillMasteryDto)
  @ValidateNested()
  skills: SkillMasteryDto[];

  @IsArray()
  @Type(() => LanguageProficiencyDto)
  @ValidateNested()
  languages: LanguageProficiencyDto[];
}
