import { Type } from "class-transformer";
import { IsArray, IsISO8601, IsOptional, IsString } from "class-validator";
import { AddCvProjectInput, RemoveCvProjectInput, UpdateCvProjectInput } from "src/graphql";

export class RemoveCvProjectDto implements RemoveCvProjectInput {
  @IsString()
  cvId: string;

  @IsString()
  projectId: string;
}

export class UpdateCvProjectDto extends RemoveCvProjectDto implements UpdateCvProjectInput {
  @IsISO8601()
  start_date: string;

  @IsISO8601()
  @IsOptional()
  end_date?: string;

  @IsArray()
  @Type(() => String)
  roles: string[];

  @IsArray()
  @Type(() => String)
  responsibilities: string[];
}

export class AddCvProjectDto extends UpdateCvProjectDto implements AddCvProjectInput {}
