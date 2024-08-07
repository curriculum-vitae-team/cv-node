import { Type } from "class-transformer";
import { IsArray, IsString } from "class-validator";
import { AddCvSkillInput, UpdateCvSkillInput, DeleteCvSkillInput } from "src/graphql";
import { SkillMasteryDto } from "src/skills/dto/skill-mastery.dto";

export class AddCvSkillDto extends SkillMasteryDto implements AddCvSkillInput {
  @IsString()
  cvId: string;
}

export class UpdateCvSkillDto extends SkillMasteryDto implements UpdateCvSkillInput {
  @IsString()
  cvId: string;
}

export class DeleteCvSkillDto implements DeleteCvSkillInput {
  @IsString()
  cvId: string;

  @IsArray()
  @Type(() => String)
  name: string[];
}
