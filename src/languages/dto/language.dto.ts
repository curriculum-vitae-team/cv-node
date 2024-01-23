import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { CreateLanguageInput, UpdateLanguageInput, DeleteLanguageInput } from "src/graphql";

export class CreateLanguageDto implements CreateLanguageInput {
  @IsString()
  @Length(2, 2)
  iso2: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  native_name?: string;
}

export class UpdateLanguageDto extends CreateLanguageDto implements UpdateLanguageInput {
  @IsString()
  @IsNotEmpty()
  languageId: string;
}

export class DeleteLanguageDto implements DeleteLanguageInput {
  @IsString()
  @IsNotEmpty()
  languageId: string;
}
