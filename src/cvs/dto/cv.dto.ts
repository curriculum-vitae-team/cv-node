import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { CreateCvInput, UpdateCvInput, DeleteCvInput } from "src/graphql";

export class CreateCvDto implements CreateCvInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @IsArray()
  @Type(() => String)
  projectsIds: string[];
}

export class UpdateCvDto implements UpdateCvInput {
  @IsString()
  @IsNotEmpty()
  cvId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @Type(() => String)
  projectsIds: string[];
}

export class DeleteCvDto implements DeleteCvInput {
  @IsString()
  @IsNotEmpty()
  cvId: string;
}
