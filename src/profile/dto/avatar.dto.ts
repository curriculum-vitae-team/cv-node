import { IsIn, IsInt, IsString, Max, MaxLength } from "class-validator";
import { AvatarInput } from "src/graphql";

export class AvatarDto implements AvatarInput {
  @IsString()
  base64: string;

  @IsInt()
  @Max(500_000)
  size: number;

  @IsString()
  @IsIn(["image/jpeg", "image/png", "image/gif", "image/svg+xml"])
  type: string;
}
