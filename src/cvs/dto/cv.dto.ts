import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CvInput } from "src/graphql";
import { LanguageProficiencyDto } from "src/languages/dto/language-proficiency.dto";

export class CvDto implements CvInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;

  @IsArray()
  @Type(() => String)
  projectsIds: string[];

  @IsArray()
  @Type(() => LanguageProficiencyDto)
  @ValidateNested()
  languages: LanguageProficiencyDto[];
}
