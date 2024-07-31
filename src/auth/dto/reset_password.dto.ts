import { MinLength } from "class-validator";
import { ResetPasswordInput } from "src/graphql";

export class ResetPasswordDto implements ResetPasswordInput {
  @MinLength(5)
  newPassword: string;
}
