import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSkillInput, UpdateSkillInput } from "src/graphql";
import { In, Repository } from "typeorm";
import { SkillModel } from "./model/skill.model";
import { DeleteSkillDto } from "./dto/skill.dto";

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
    return this.skillsRepository.findOne({
      where: { id },
    });
  }

  createSkill({ name, category }: CreateSkillInput) {
    const skill = this.skillsRepository.create({ name, category });
    return this.skillsRepository.save(skill);
  }

  async updateSkill({ skillId, name, category }: UpdateSkillInput) {
    const skill = await this.findOneById(skillId);
    skill.name = name;
    skill.category = category;
    return this.skillsRepository.save(skill);
  }

  deleteSkill({ skillId }: DeleteSkillDto) {
    return this.skillsRepository.delete(skillId);
  }
}
