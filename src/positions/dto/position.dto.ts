import { IsString } from "class-validator";
import { PositionInput } from "src/graphql";

export class PositionDto implements PositionInput {
  @IsString()
  name: string;
}
