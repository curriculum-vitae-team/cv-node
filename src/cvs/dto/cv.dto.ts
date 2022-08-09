import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { CvInput } from "src/graphql";

export class CvDto implements CvInput {
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
