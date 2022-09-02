import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileModel } from "./model/profile.model";
import { DepartmentsService } from "src/departments/departments.service";
import { PositionsService } from "src/positions/positions.service";
import { ProfileInput } from "src/graphql";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    private readonly departmentsService: DepartmentsService,
    private readonly positionsService: PositionsService
  ) {}

  findOnyById(id: string) {
    return this.profileRepository.findOne({
      where: { id },
    });
  }

  async create(variables: ProfileInput) {
    const { departmentId, positionId, ...fields } = variables;
    const [department, position] = await Promise.all([
      this.departmentsService.findOneById(departmentId),
      this.positionsService.findOneById(positionId),
    ]);
    const profile = this.profileRepository.create({
      ...fields,
      department,
      position,
    });
    return this.profileRepository.save(profile);
  }

  async update(id: string, variables: ProfileInput) {
    const { departmentId, positionId, ...fields } = variables;
    const [profile, department, position] = await Promise.all([
      this.findOnyById(id),
      this.departmentsService.findOneById(departmentId),
      this.positionsService.findOneById(positionId),
    ]);
    Object.assign(profile, {
      ...fields,
      department,
      position,
    });
    return this.profileRepository.save(profile);
  }
}
