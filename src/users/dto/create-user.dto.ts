import { IsEmail, MinLength, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { CreateUserInput } from "src/graphql";

export class CreateUserDto implements CreateUserInput {
  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;

  first_name: string;

  last_name: string;

  @IsArray()
  @Type(() => String)
  cvsIds: string[];
}
