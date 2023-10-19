import { IsString } from "class-validator";
import { UpdateProfileInput } from "src/graphql";

export class UpdateProfileDto implements UpdateProfileInput {
  @IsString()
  profileId: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
