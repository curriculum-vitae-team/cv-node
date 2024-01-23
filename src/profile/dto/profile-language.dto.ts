import { IsNotEmpty, IsString } from "class-validator";
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
  @IsNotEmpty()
  userId: string;
}

export class UpdateProfileLanguageDto
  extends LanguageProficiencyDto
  implements UpdateProfileLanguageInput
{
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class DeleteProfileLanguageDto implements DeleteProfileLanguageInput {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  name: string;
}
