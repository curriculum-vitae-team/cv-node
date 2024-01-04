import { IsString } from "class-validator";

import {
  AddProfileSkillInput,
  DeleteProfileSkillInput,
  UpdateProfileSkillInput,
} from "src/graphql";
import { SkillMasteryDto } from "src/skills/dto/skill-mastery.dto";

export class AddProfileSkillDto extends SkillMasteryDto implements AddProfileSkillInput {
  @IsString()
  profileId: string;
}

export class UpdateProfileSkillDto extends SkillMasteryDto implements UpdateProfileSkillInput {
  @IsString()
  profileId: string;
}

export class DeleteProfileSkillDto implements DeleteProfileSkillInput {
  @IsString()
  profileId: string;

  @IsString()
  skill_name: string;
}
