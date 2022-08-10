import { IsArray, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ProfileInput } from "src/graphql";

export class ProfileDto implements ProfileInput {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  departmentId: string;

  @IsString()
  specialization: string;

  @IsArray()
  @Type(() => String)
  skills: string[];

  @IsArray()
  @Type(() => String)
  languages: string[];
}
