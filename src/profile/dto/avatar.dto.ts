import { IsIn, IsInt, IsString, Max } from "class-validator";

export class AvatarDto {
  @IsInt()
  @Max(250_000)
  size: number;

  @IsString()
  @IsIn(["image/jpeg"])
  type: string;
}
