import { IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateProjectInput } from "../../graphql";

export class CreateProjectDto implements CreateProjectInput {
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
