import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileModel } from "./model/profile.model";
import { CloudService } from "src/cloud/cloud.service";
import { AvatarInput, ProfileInput } from "src/graphql";

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

  async create(variables: ProfileInput) {
    const profile = this.profileRepository.create(variables);
    return this.profileRepository.save(profile);
  }

  async update(id: string, variables: ProfileInput) {
    const { first_name, last_name, skills, languages } = variables;
    const profile = await this.findOnyById(id);
    if (skills) {
      profile.skills = skills;
    }
    if (languages) {
      profile.languages = languages;
    }
    Object.assign(profile, {
      first_name,
      last_name,
    });
    return this.profileRepository.save(profile);
  }

  async uploadAvatar(id: string, avatar: AvatarInput) {
    const profile = await this.findOnyById(id);
    const url = await this.cloudService.uploadImage(avatar.base64);
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
