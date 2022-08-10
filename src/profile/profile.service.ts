import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileModel } from "./model/profile.model";
import { ProfileInput } from "src/graphql";
import { DepartmentsService } from "src/departments/departments.service";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    private readonly departmentsService: DepartmentsService
  ) {}

  findOnyById(id: string) {
    return this.profileRepository.findOneOrFail({
      where: { id },
    });
  }

  async create(variables: ProfileInput) {
    const {
      first_name,
      last_name,
      departmentId,
      specialization,
      languages,
      skills,
    } = variables;
    const profile = this.profileRepository.create({
      first_name,
      last_name,
      department: await this.departmentsService.findOneById(departmentId),
      specialization,
      languages,
      skills,
    });
    return this.profileRepository.save(profile);
  }

  async update(id: string, variables: ProfileInput) {
    const {
      first_name,
      last_name,
      departmentId,
      specialization,
      languages,
      skills,
    } = variables;
    const profile = await this.findOnyById(id);
    Object.assign(profile, {
      first_name,
      last_name,
      department: await this.departmentsService.findOneById(departmentId),
      specialization,
      languages,
      skills,
    });
    return this.profileRepository.save(profile);
  }
}
