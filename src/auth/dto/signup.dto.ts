import { IsEmail, MinLength } from "class-validator";
import { SignupInput } from "src/graphql";

export class SignupDto implements SignupInput {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}
