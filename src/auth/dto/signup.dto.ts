import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { SignupInput } from "src/graphql";

export class SignupDto implements SignupInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
