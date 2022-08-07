import { IsNotEmpty, Length } from "class-validator";
import { CreateLanguageInput } from "src/graphql";

export class CreateLanguageDto implements CreateLanguageInput {
  @Length(2)
  iso2: string;

  @IsNotEmpty()
  name: string;
}
