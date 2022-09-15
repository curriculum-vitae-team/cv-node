import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ProfileService } from "./profile.service";

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation("uploadAvatar")
  uploadAvatar(@Args("id") id: string, @Args("avatar") avatar) {
    console.log(avatar);
    this.profileService.uploadAvatar(id, avatar);
  }
}
