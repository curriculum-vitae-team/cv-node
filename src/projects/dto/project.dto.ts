import { IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ProjectInput } from "src/graphql";

export class ProjectDto implements ProjectInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  internal_name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsISO8601()
  start_date: string;

  @IsISO8601()
  @IsOptional()
  end_date: string;
}
