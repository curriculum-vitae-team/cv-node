import { IsArray, IsObject, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateUserInput } from "src/graphql";
import { ProfileDto } from "src/profile/dto/profile.dto";

export class UpdateUserDto implements UpdateUserInput {
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
