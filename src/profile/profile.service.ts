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
      skills,
      languages,
    } = variables;
    const department = await this.departmentsService.findOneById(departmentId);
    const profile = this.profileRepository.create({
      first_name,
      last_name,
      department,
      specialization,
      skills,
      languages,
    });
    return this.profileRepository.save(profile);
  }

  async update(id: string, variables: ProfileInput) {
    const {
      first_name,
      last_name,
      departmentId,
      specialization,
      skills,
      languages,
    } = variables;
    const [profile, department] = await Promise.all([
      this.findOnyById(id),
      this.departmentsService.findOneById(departmentId),
    ]);
    Object.assign(profile, {
      first_name,
      last_name,
      department,
      specialization,
      skills,
      languages,
    });
    return this.profileRepository.save(profile);
  }
}
