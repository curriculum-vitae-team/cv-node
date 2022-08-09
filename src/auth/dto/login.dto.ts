import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { AuthInput } from "src/graphql";

export class LoginDto implements AuthInput {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
