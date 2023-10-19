import { IsArray, IsEnum, IsObject, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateUserInput } from "src/graphql";
import { SignupDto } from "src/auth/dto/signup.dto";
import { UserRole } from "src/graphql";
import { CreateProfileDto } from "src/profile/dto/create-profile.dto";

export class CreateUserDto implements CreateUserInput {
  @IsObject()
  @Type(() => SignupDto)
  auth: SignupDto;

  @IsEnum(UserRole)
  role: UserRole;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile: CreateProfileDto;

  @IsArray()
  @Type(() => String)
  cvsIds: string[];

  @IsString()
  departmentId: string;

  @IsString()
  positionId: string;
}
