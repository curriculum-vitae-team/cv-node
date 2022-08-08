import { IsArray, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import { UpdateUserInput } from "src/graphql";

export class UpdateUserDto implements UpdateUserInput {
  @IsNotEmpty()
  id: string;

  first_name: string;

  last_name: string;

  @IsArray()
  @Type(() => String)
  cvsIds: string[];
}
