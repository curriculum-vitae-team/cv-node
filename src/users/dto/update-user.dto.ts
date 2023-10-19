import { IsArray, IsEnum, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateUserInput } from "src/graphql";
import { UpdateProfileDto } from "src/profile/dto/update-profile.dto";
import { UserRole } from "src/graphql";

export class UpdateUserDto implements UpdateUserInput {
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  profile: UpdateProfileDto;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  cvsIds: string[];

  @IsString()
  departmentId: string;

  @IsString()
  positionId: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;
}
