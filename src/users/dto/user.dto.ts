import { IsArray, IsObject } from "class-validator";
import { Type } from "class-transformer";
import { UserInput } from "src/graphql";
import { ProfileDto } from "src/profile/dto/profile.dto";

export class UserDto implements UserInput {
  @IsObject()
  @Type(() => ProfileDto)
  profile: ProfileDto;

  @IsArray()
  @Type(() => String)
  cvsIds: string[];
}
