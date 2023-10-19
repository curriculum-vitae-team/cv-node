import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileModel } from "./model/profile.model";
import { CloudService } from "src/cloud/cloud.service";
import {
  UploadAvatarInput,
  CreateProfileInput,
  UpdateProfileInput,
  ProfileLanguagesInput,
  ProfileSkillsInput,
} from "src/graphql";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    private readonly cloudService: CloudService
  ) {}

  findOnyById(id: string) {
    return this.profileRepository.findOne({
      where: { id },
    });
  }

  async createProfile({ first_name, last_name }: CreateProfileInput) {
    const profile = this.profileRepository.create({ first_name, last_name });
    return this.profileRepository.save(profile);
  }

  async updateProfile({ profileId, first_name, last_name }: UpdateProfileInput) {
    const profile = await this.findOnyById(profileId);
    profile.first_name = first_name;
    profile.last_name = last_name;
    return this.profileRepository.save(profile);
  }

  async updateProfileSkills({ profileId, skills }: ProfileSkillsInput) {
    const profile = await this.findOnyById(profileId);
    profile.skills = skills;
    return this.profileRepository.save(profile);
  }

  async updateProfileLanguages({ profileId, languages }: ProfileLanguagesInput) {
    const profile = await this.findOnyById(profileId);
    profile.languages = languages;
    return this.profileRepository.save(profile);
  }

  async uploadAvatar({ profileId, base64 }: UploadAvatarInput) {
    const profile = await this.findOnyById(profileId);
    const url = await this.cloudService.uploadImage(base64);
    profile.avatar = url;
    await this.profileRepository.save(profile);
    return url;
  }

  async deleteAvatar(id: string) {
    const profile = await this.findOnyById(id);
    profile.avatar = null;
    await this.profileRepository.save(profile);
    return null;
  }
}
