import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateCvInput, UpdateCvInput, DeleteCvInput } from "src/graphql";

export class CreateCvDto implements CreateCvInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  education: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userId: string;
}

export class UpdateCvDto implements UpdateCvInput {
  @IsString()
  @IsNotEmpty()
  cvId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  education: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class DeleteCvDto implements DeleteCvInput {
  @IsString()
  @IsNotEmpty()
  cvId: string;
}
