import { IsEmail, IsNotEmpty } from "class-validator";
import { LoginInput } from "src/graphql";

export class LoginDto implements LoginInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
