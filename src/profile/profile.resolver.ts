import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AvatarDto } from "./dto/avatar.dto";
import { ProfileService } from "./profile.service";

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation("uploadAvatar")
  uploadAvatar(@Args("id") id: string, @Args("avatar") avatar: AvatarDto) {
    this.profileService.uploadAvatar(id, avatar);
  }
}
