import { IsIn, IsString } from "class-validator";
import { LanguageProficiencyInput } from "src/graphql";

export class LanguageProficiencyDto implements LanguageProficiencyInput {
  @IsString()
  language_name: string;

  @IsString()
  @IsIn(["A1", "A2", "B1", "B2", "C1", "C2", "Native"])
  proficiency: string;
}
