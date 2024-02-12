import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CreateProjectInput, UpdateProjectInput, DeleteProjectInput } from "src/graphql";

export class CreateProjectDto implements CreateProjectInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  internal_name: string;

  @IsString()
  description: string;

  @IsString()
  domain: string;

  @IsISO8601()
  start_date: string;

  @IsISO8601()
  @IsOptional()
  end_date: string;

  @IsNumber()
  team_size: number;
}

export class UpdateProjectDto extends CreateProjectDto implements UpdateProjectInput {
  @IsString()
  projectId: string;
}

export class DeleteProjectDto implements DeleteProjectInput {
  @IsString()
  projectId: string;
}
