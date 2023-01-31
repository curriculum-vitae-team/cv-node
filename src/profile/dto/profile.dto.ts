import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProfileInput } from "src/graphql";
import { SkillMasteryDto } from "src/skills/dto/skill-mastery.dto";
import { LanguageProficiencyDto } from "src/languages/dto/language-proficiency.dto";

export class ProfileDto implements ProfileInput {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => SkillMasteryDto)
  skills: SkillMasteryDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @Type(() => LanguageProficiencyDto)
  languages: LanguageProficiencyDto[];
}
