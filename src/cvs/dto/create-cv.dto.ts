import { IsNotEmpty } from "class-validator";
import { CreateCvInput } from "src/graphql";

export class CreateCvDto implements CreateCvInput {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  languages: { languageId: string; proficiency: string }[];

  @IsNotEmpty()
  userId: string;
}
