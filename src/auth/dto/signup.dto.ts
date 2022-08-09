import { IsEmail, MinLength } from "class-validator";
import { AuthInput } from "src/graphql";

export class SignupDto implements AuthInput {
  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;
}
