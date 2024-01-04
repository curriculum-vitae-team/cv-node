import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileModel } from "./model/profile.model";
import { CloudService } from "src/cloud/cloud.service";
import {
  UploadAvatarInput,
  CreateProfileInput,
  UpdateProfileInput,
  AddProfileSkillInput,
  UpdateProfileSkillInput,
  DeleteProfileSkillInput,
  AddProfileLanguageInput,
  UpdateProfileLanguageInput,
  DeleteProfileLanguageInput,
  DeleteAvatarInput,
} from "src/graphql";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    private readonly cloudService: CloudService
  ) {}

  findOnyById(profileId: string) {
    return this.profileRepository.findOne({
      where: { id: profileId },
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

  async addProfileSkill({ profileId, skill_name, mastery }: AddProfileSkillInput) {
    const profile = await this.findOnyById(profileId);
    profile.skills.push({ skill_name, mastery });
    return this.profileRepository.save(profile);
  }

  async updateProfileSkill({ profileId, skill_name, mastery }: UpdateProfileSkillInput) {
    const profile = await this.findOnyById(profileId);
    profile.skills = profile.skills.map((skill) => {
      if (skill.skill_name === skill_name) {
        return { skill_name, mastery };
      }
      return skill;
    });
    return this.profileRepository.save(profile);
  }

  async deleteProfileSkill({ profileId, skill_name }: DeleteProfileSkillInput) {
    const profile = await this.findOnyById(profileId);
    profile.skills = profile.skills.filter((skill) => skill.skill_name !== skill_name);
    return this.profileRepository.save(profile);
  }

  async addProfileLanguage({ profileId, language_name, proficiency }: AddProfileLanguageInput) {
    const profile = await this.findOnyById(profileId);
    profile.languages.push({ language_name, proficiency });
    return this.profileRepository.save(profile);
  }

  async updateProfileLanguage({
    profileId,
    language_name,
    proficiency,
  }: UpdateProfileLanguageInput) {
    const profile = await this.findOnyById(profileId);
    profile.languages = profile.languages.map((language) => {
      if (language.language_name === language_name) {
        return { language_name, proficiency };
      }
      return language;
    });
    return this.profileRepository.save(profile);
  }

  async deleteProfileLanguage({ profileId, language_name }: DeleteProfileLanguageInput) {
    const profile = await this.findOnyById(profileId);
    profile.languages = profile.languages.filter(
      (language) => language.language_name !== language_name
    );
    return this.profileRepository.save(profile);
  }

  async uploadAvatar({ profileId, base64 }: UploadAvatarInput) {
    const profile = await this.findOnyById(profileId);
    const url = await this.cloudService.uploadImage(base64);
    profile.avatar = url;
    await this.profileRepository.save(profile);
    return url;
  }

  async deleteAvatar({ profileId }: DeleteAvatarInput) {
    const profile = await this.findOnyById(profileId);
    profile.avatar = null;
    await this.profileRepository.save(profile);
    return null;
  }
}
