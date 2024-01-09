import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateSkillInput, UpdateSkillInput, DeleteSkillInput } from "src/graphql";

export class CreateSkillDto implements CreateSkillInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  category?: string;
}

export class UpdateSkillDto extends CreateSkillDto implements UpdateSkillInput {
  @IsString()
  skillId: string;
}

export class DeleteSkillDto implements DeleteSkillInput {
  @IsString()
  skillId: string;
}
