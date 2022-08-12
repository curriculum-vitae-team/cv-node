import { IsArray, IsObject } from "class-validator";
import { Type } from "class-transformer";
import { CreateUserInput } from "src/graphql";
import { SignupDto } from "src/auth/dto/signup.dto";
import { ProfileDto } from "src/profile/dto/profile.dto";

export class CreateUserDto implements CreateUserInput {
  @IsObject()
  @Type(() => SignupDto)
  auth: SignupDto;

  @IsObject()
  @Type(() => ProfileDto)
  profile: ProfileDto;

  @IsArray()
  @Type(() => String)
  cvsIds: string[];
}
