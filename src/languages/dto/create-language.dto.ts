import { IsNotEmpty, IsString, Length } from "class-validator";
import { CreateLanguageInput } from "src/graphql";

export class CreateLanguageDto implements CreateLanguageInput {
  @IsString()
  @Length(2)
  iso2: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
