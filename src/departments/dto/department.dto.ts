import { IsNotEmpty, IsString } from "class-validator";
import { DepartmentInput } from "src/graphql";

export class DepartmentDto implements DepartmentInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
