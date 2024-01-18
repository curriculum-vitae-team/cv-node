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
  DeleteProfileInput,
} from "src/graphql";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    private readonly cloudService: CloudService
  ) {}

  findOneById(userId: string) {
    return this.profileRepository.findOne({
      where: { id: userId },
    });
  }

  async createProfile({ first_name, last_name }: CreateProfileInput) {
    const profile = this.profileRepository.create({ first_name, last_name });
    return this.profileRepository.save(profile);
  }

  async updateProfile({ userId, first_name, last_name }: UpdateProfileInput) {
    const profile = await this.findOneById(userId);
    profile.first_name = first_name;
    profile.last_name = last_name;
    return this.profileRepository.save(profile);
  }

  async addProfileSkill({ userId, name, category, mastery }: AddProfileSkillInput) {
    const profile = await this.findOneById(userId);
    profile.skills.push({ name, category, mastery });
    return this.profileRepository.save(profile);
  }

  async updateProfileSkill({ userId, name, mastery }: UpdateProfileSkillInput) {
    const profile = await this.findOneById(userId);
    profile.skills = profile.skills.map((skill) => {
      if (skill.name === name) {
        return { name, category: skill.category, mastery };
      }
      return skill;
    });
    return this.profileRepository.save(profile);
  }

  async deleteProfileSkill({ userId, name }: DeleteProfileSkillInput) {
    const profile = await this.findOneById(userId);
    profile.skills = profile.skills.filter((skill) => !name.includes(skill.name));
    return this.profileRepository.save(profile);
  }

  async addProfileLanguage({ userId, language_name, proficiency }: AddProfileLanguageInput) {
    const profile = await this.findOneById(userId);
    profile.languages.push({ language_name, proficiency });
    return this.profileRepository.save(profile);
  }

  async updateProfileLanguage({ userId, language_name, proficiency }: UpdateProfileLanguageInput) {
    const profile = await this.findOneById(userId);
    profile.languages = profile.languages.map((language) => {
      if (language.language_name === language_name) {
        return { language_name, proficiency };
      }
      return language;
    });
    return this.profileRepository.save(profile);
  }

  async deleteProfileLanguage({ userId, language_name }: DeleteProfileLanguageInput) {
    const profile = await this.findOneById(userId);
    profile.languages = profile.languages.filter(
      (language) => language.language_name !== language_name
    );
    return this.profileRepository.save(profile);
  }

  async uploadAvatar({ userId, base64 }: UploadAvatarInput) {
    const profile = await this.findOneById(userId);
    const url = await this.cloudService.uploadImage(base64);
    profile.avatar = url;
    await this.profileRepository.save(profile);
    return url;
  }

  async deleteAvatar({ userId }: DeleteAvatarInput) {
    const profile = await this.findOneById(userId);
    profile.avatar = null;
    await this.profileRepository.save(profile);
    return null;
  }

  deleteProfile({ userId }: DeleteProfileInput) {
    return this.profileRepository.delete(userId);
  }
}
