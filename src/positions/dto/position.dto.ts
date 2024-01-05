import { IsNotEmpty, IsString } from "class-validator";
import { CreatePositionInput, DeletePositionInput, UpdatePositionInput } from "src/graphql";

export class CreatePositionDto implements CreatePositionInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdatePositionDto extends CreatePositionDto implements UpdatePositionInput {
  @IsString()
  @IsNotEmpty()
  positionId: string;
}

export class DeletePositionDto implements DeletePositionInput {
  @IsString()
  @IsNotEmpty()
  positionId: string;
}
