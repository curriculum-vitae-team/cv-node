import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DeleteAvatarDto, UploadAvatarDto } from "./dto/profile-avatar.dto";
import { ProfileService } from "./profile.service";
import {
  AddProfileSkillDto,
  UpdateProfileSkillDto,
  DeleteProfileSkillDto,
} from "./dto/profile-skill.dto";
import {
  AddProfileLanguageDto,
  UpdateProfileLanguageDto,
  DeleteProfileLanguageDto,
} from "./dto/profile-language.dto";
import { UpdateProfileDto } from "./dto/profile.dto";

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query("profile")
  profile(@Args("profileId") profileId: string) {
    return this.profileService.findOneById(profileId);
  }

  @Mutation("updateProfile")
  updateProfile(@Args("profile") args: UpdateProfileDto) {
    return this.profileService.updateProfile(args);
  }

  @Mutation("addProfileSkill")
  addProfileSkill(@Args("skill") args: AddProfileSkillDto) {
    return this.profileService.addProfileSkill(args);
  }

  @Mutation("updateProfileSkill")
  updateProfileSkill(@Args("skill") args: UpdateProfileSkillDto) {
    return this.profileService.updateProfileSkill(args);
  }

  @Mutation("deleteProfileSkill")
  deleteProfileSkill(@Args("skill") args: DeleteProfileSkillDto) {
    return this.profileService.deleteProfileSkill(args);
  }

  @Mutation("addProfileLanguage")
  addProfileLanguage(@Args("language") args: AddProfileLanguageDto) {
    return this.profileService.addProfileLanguage(args);
  }

  @Mutation("updateProfileLanguage")
  updateProfileLanguage(@Args("language") args: UpdateProfileLanguageDto) {
    return this.profileService.updateProfileLanguage(args);
  }

  @Mutation("deleteProfileLanguage")
  deleteProfileLanguage(@Args("language") args: DeleteProfileLanguageDto) {
    return this.profileService.deleteProfileLanguage(args);
  }

  @Mutation("uploadAvatar")
  uploadAvatar(@Args("avatar") args: UploadAvatarDto) {
    return this.profileService.uploadAvatar(args);
  }

  @Mutation("deleteAvatar")
  deleteAvatar(@Args("avatar") args: DeleteAvatarDto) {
    return this.profileService.deleteAvatar(args);
  }
}
