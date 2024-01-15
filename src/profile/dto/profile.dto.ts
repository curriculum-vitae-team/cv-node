import { IsNotEmpty, IsString } from "class-validator";
import { CreateProfileInput, UpdateProfileInput } from "src/graphql";

export class CreateProfileDto implements CreateProfileInput {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}

export class UpdateProfileDto extends CreateProfileDto implements UpdateProfileInput {}
