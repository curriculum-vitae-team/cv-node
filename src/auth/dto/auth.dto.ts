import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { AuthInput } from "src/graphql";

export class AuthDto implements AuthInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
