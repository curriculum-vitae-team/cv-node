import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { LanguageInput } from "src/graphql";

export class LanguageDto implements LanguageInput {
  @Length(2, 2)
  iso2: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  native_name?: string;
}
