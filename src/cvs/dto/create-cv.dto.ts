import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { CreateCvInput } from "src/graphql";

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
