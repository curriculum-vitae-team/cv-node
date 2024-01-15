import { IsString, IsNotEmpty, Length } from "class-validator";
import { VerifyMailInput } from "src/graphql";

export class VerifyMailDto implements VerifyMailInput {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;
}
