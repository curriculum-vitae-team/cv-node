import { Args, Mutation, Resolver } from "@nestjs/graphql";
import * as GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import { ProfileService } from "./profile.service";

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation("uploadAvatar")
  uploadAvatar(@Args("id") id: string, @Args("avatar") avatar: GraphQLUpload) {
    console.log(avatar);
    this.profileService.uploadAvatar(id, avatar);
  }
}
