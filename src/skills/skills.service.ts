import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SkillInput } from "src/graphql";
import { In, Repository } from "typeorm";
import { SkillModel } from "./model/skill.model";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillModel)
    private readonly skillsRepository: Repository<SkillModel>
  ) {}

  findAll() {
    return this.skillsRepository.find();
  }

  findMany(ids: string[]) {
    return this.skillsRepository.find({
      where: { id: In(ids) },
    });
  }

  findOneById(id: string) {
    return this.skillsRepository.findOneOrFail({
      where: { id },
    });
  }

  create(variables: SkillInput) {
    const skill = this.skillsRepository.create(variables);
    return this.skillsRepository.save(skill);
  }

  async update(id: string, variables: SkillInput) {
    const skill = await this.findOneById(id);
    Object.assign(skill, variables);
    return this.skillsRepository.save(skill);
  }

  delete(id: string) {
    return this.skillsRepository.delete(id);
  }
}
