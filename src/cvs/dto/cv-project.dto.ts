import { IsString } from "class-validator";
import { AddCvProjectInput, RemoveCvProjectInput } from "src/graphql";

export class AddCvProjectDto implements AddCvProjectInput {
  @IsString()
  cvId: string;

  @IsString()
  projectId: string;
}

export class RemoveCvProjectDto extends AddCvProjectDto implements RemoveCvProjectInput {}
