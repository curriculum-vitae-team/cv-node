import {
  IsArray,
  IsEnum,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateUserInput } from "src/graphql";
import { SignupDto } from "src/auth/dto/signup.dto";
import { ProfileDto } from "src/profile/dto/profile.dto";
import { UserRole } from "src/graphql";

export class CreateUserDto implements CreateUserInput {
  @IsObject()
  @Type(() => SignupDto)
  auth: SignupDto;

  @IsEnum(UserRole)
  role: UserRole;

  @IsObject()
  @ValidateNested()
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
