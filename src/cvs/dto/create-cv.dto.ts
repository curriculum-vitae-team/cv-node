import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { CreateCvInput } from "src/graphql";

export class CreateCvDto implements CreateCvInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  userId: string;

  @IsArray()
  @Type(() => String)
  @ArrayMinSize(1)
  @IsOptional()
  projectsIds: string[];
}
