import { IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UpdateProjectInput } from "src/graphql";

export class UpdateProjectDto implements UpdateProjectInput {
  @IsString()
  @IsNotEmpty()
  id: string;

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
