import { IsArray, IsEnum, IsObject, IsString } from "class-validator";
import { Type } from "class-transformer";
import { CreateUserInput } from "src/graphql";
import { SignupDto } from "src/auth/dto/signup.dto";
import { ProfileDto } from "src/profile/dto/profile.dto";
import { UserRoles } from "../model/user.roles";

export class CreateUserDto implements CreateUserInput {
  @IsObject()
  @Type(() => SignupDto)
  auth: SignupDto;

  @IsEnum(UserRoles)
  role: UserRoles;

  @IsObject()
  @Type(() => ProfileDto)
  profile: ProfileDto;

  @IsArray()
  @Type(() => String)
  cvsIds: string[];

  @IsString()
  departmentId: string;

  @IsString()
  positionId: string;
}
