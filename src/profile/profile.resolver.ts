import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UploadAvatarDto } from "./dto/upload-avatar.dto";
import { ProfileService } from "./profile.service";
import { ProfileSkillsDto } from "./dto/profile-skills.dto";
import { ProfileLanguagesDto } from "./dto/profile-languages.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation("updateProfile")
  updateProfile(@Args() args: UpdateProfileDto) {
    return this.profileService.updateProfile(args);
  }

  @Mutation("updateProfileSkills")
  updateProfileSkills(@Args() args: ProfileSkillsDto) {
    return this.profileService.updateProfileSkills(args);
  }

  @Mutation("updateProfileLanguages")
  updateProfileLanguages(@Args() args: ProfileLanguagesDto) {
    return this.profileService.updateProfileLanguages(args);
  }

  @Mutation("uploadAvatar")
  uploadAvatar(@Args() args: UploadAvatarDto) {
    return this.profileService.uploadAvatar(args);
  }

  @Mutation("deleteAvatar")
  deleteAvatar(@Args("id") id: string) {
    return this.profileService.deleteAvatar(id);
  }
}
