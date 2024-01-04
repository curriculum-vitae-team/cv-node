import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { UpdateUserInput } from "src/graphql";
import { UserRole } from "src/graphql";

export class UpdateUserDto implements UpdateUserInput {
  @IsString()
  userId: string;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  cvsIds: string[];

  @IsString()
  departmentId: string;

  @IsString()
  positionId: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;
}
