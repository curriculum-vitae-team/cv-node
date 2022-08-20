import { IsIn, IsString } from "class-validator";
import { LanguageProficiencyInput } from "src/graphql";

export class LanguageProficiencyDto implements LanguageProficiencyInput {
  @IsString()
  language_name: string;

  @IsString()
  @IsIn(["a1", "a2", "b1", "b2", "c1", "c2", "native"])
  proficiency: string;
}
