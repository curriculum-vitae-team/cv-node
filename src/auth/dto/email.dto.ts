import { IsEmail } from "class-validator";
import { ForgotPasswordInput } from "src/graphql";

export class EmailDto implements ForgotPasswordInput {
  @IsEmail()
  email: string;
}
