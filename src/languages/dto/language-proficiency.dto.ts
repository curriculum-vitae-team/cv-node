import { IsIn, IsString } from "class-validator";
import { LanguageProficiencyInput, Proficiency } from "src/graphql";

const PROFICIENCIES = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

export class LanguageProficiencyDto implements LanguageProficiencyInput {
  @IsString()
  name: string;

  @IsString()
  @IsIn(PROFICIENCIES)
  proficiency: Proficiency;
}
