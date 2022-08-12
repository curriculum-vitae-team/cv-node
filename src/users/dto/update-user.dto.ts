import { IsArray, IsObject, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { UpdateUserInput } from "src/graphql";
import { ProfileDto } from "src/profile/dto/profile.dto";

export class UpdateUserDto implements UpdateUserInput {
  @IsObject()
  @Type(() => ProfileDto)
  @IsOptional()
  profile: ProfileDto;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  cvsIds: string[];
}
