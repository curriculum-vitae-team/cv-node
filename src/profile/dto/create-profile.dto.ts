import { IsString } from "class-validator";
import { CreateProfileInput } from "src/graphql";

export class CreateProfileDto implements CreateProfileInput {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}
