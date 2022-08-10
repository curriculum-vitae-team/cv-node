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
    return this.profileRepository.findOneOrFail({
      where: { id },
    });
  }

  create(variables: ProfileInput) {
    const profile = this.profileRepository.create(variables);
    return this.profileRepository.save(profile);
  }

  async update(id: string, variables: ProfileInput) {
    const profile = await this.findOnyById(id);
    Object.assign(profile, variables);
    return this.profileRepository.save(profile);
  }
}
