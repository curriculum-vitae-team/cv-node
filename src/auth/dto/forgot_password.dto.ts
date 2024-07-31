import { IsEmail } from "class-validator";
import { ForgotPasswordInput } from "src/graphql";

export class ForgotPasswordDto implements ForgotPasswordInput {
  @IsEmail()
  email: string;
}
