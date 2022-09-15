import { IsIn, IsInt, IsString, Max } from "class-validator";

export class AvatarDto extends File {
  @IsInt()
  @Max(250_000)
  size: number;

  @IsString()
  @IsIn(["image/jpeg"])
  type: string;
}
