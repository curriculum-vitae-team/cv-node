import { IsString } from "class-validator";
import {
  AddProfileLanguageInput,
  DeleteProfileLanguageInput,
  UpdateProfileLanguageInput,
} from "src/graphql";
import { LanguageProficiencyDto } from "src/languages/dto/language-proficiency.dto";

export class AddProfileLanguageDto
  extends LanguageProficiencyDto
  implements AddProfileLanguageInput
{
  @IsString()
  profileId: string;
}

export class UpdateProfileLanguageDto
  extends LanguageProficiencyDto
  implements UpdateProfileLanguageInput
{
  @IsString()
  profileId: string;
}

export class DeleteProfileLanguageDto implements DeleteProfileLanguageInput {
  @IsString()
  profileId: string;

  @IsString()
  language_name: string;
}
