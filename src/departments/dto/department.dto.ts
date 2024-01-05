import { IsNotEmpty, IsString } from "class-validator";
import { CreateDepartmentInput, DeleteDepartmentInput, UpdateDepartmentInput } from "src/graphql";

export class CreateDepartmentDto implements CreateDepartmentInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateDepartmentDto extends CreateDepartmentDto implements UpdateDepartmentInput {
  @IsString()
  @IsNotEmpty()
  departmentId: string;
}

export class DeleteDepartmentDto implements DeleteDepartmentInput {
  @IsString()
  @IsNotEmpty()
  departmentId: string;
}
