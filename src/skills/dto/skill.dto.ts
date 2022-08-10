import { IsNotEmpty, IsString } from "class-validator";
import { SkillInput } from "src/graphql";

export class SkillDto implements SkillInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
