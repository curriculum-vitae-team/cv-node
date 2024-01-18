import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

import {
  AddProfileSkillInput,
  DeleteProfileSkillInput,
  UpdateProfileSkillInput,
} from "src/graphql";
import { SkillMasteryDto } from "src/skills/dto/skill-mastery.dto";

export class AddProfileSkillDto extends SkillMasteryDto implements AddProfileSkillInput {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateProfileSkillDto extends SkillMasteryDto implements UpdateProfileSkillInput {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class DeleteProfileSkillDto implements DeleteProfileSkillInput {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @Type(() => String)
  name: string[];
}
