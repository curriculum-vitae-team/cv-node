import { IsArray, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProfileLanguagesInput } from "src/graphql";
import { LanguageProficiencyDto } from "src/languages/dto/language-proficiency.dto";

export class ProfileLanguagesDto implements ProfileLanguagesInput {
  @IsString()
  profileId: string;

  @IsArray()
  @ValidateNested()
  @Type(() => LanguageProficiencyDto)
  languages: LanguageProficiencyDto[];
}
