import {
  IsArray,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
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

  @IsNumber()
  team_size: number;

  @IsArray()
  @Type(() => String)
  skillsIds: string[];
}
