import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileModel } from "./model/profile.model";
import { ProfileInput } from "src/graphql";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>
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
    const profile = await this.findOnyById(id);
    Object.assign(profile, variables);
    return this.profileRepository.save(profile);
  }

  fileToBase64(avatar: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(avatar);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async uploadAvatar(id: string, avatar: File) {
    const [profile, url] = await Promise.all([
      this.findOnyById(id),
      this.fileToBase64(avatar),
    ]);
    // TODO: save avatar to cloud and get url
    Object.assign(profile, {
      avatar: url,
    });
    await this.profileRepository.save(profile);
    return url;
  }
}
