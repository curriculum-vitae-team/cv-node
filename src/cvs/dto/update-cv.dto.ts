import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { UpdateCvInput } from "src/graphql";

export class UpdateCvDto implements UpdateCvInput {
  @IsString()
  @IsNotEmpty()
  id: string;

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
