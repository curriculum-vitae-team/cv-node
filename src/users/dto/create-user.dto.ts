import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
} from "class-validator";
import { CreateUserInput } from "src/graphql";

export class CreateUserDto implements CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(25)
  password: string;

  first_name: string;

  last_name: string;
}
