import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { LoginInput } from "src/graphql";

export class LoginDto implements LoginInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
