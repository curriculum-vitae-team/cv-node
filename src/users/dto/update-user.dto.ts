import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
import { UpdateUserInput } from "src/graphql";

export class UpdateUserDto implements UpdateUserInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  first_name: string;

  last_name: string;

  @IsArray()
  @Type(() => String)
  cvsIds: string[];
}
