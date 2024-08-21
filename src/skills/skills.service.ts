import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSkillInput, UpdateSkillInput } from "src/graphql";
import { In, Repository } from "typeorm";
import { SkillModel } from "./model/skill.model";
import { DeleteSkillDto } from "./dto/skill.dto";
import { SkillCategoriesService } from "src/skill_categories/skill_categories.service";

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(SkillModel)
    private readonly skillsRepository: Repository<SkillModel>,
    private readonly skillCategoriesService: SkillCategoriesService
  ) {}

  findAll() {
    return this.skillsRepository.find({
      relations: ["category.parent"],
    });
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

  async createSkill({ name, categoryId }: CreateSkillInput) {
    const category = await this.skillCategoriesService.findOneById(categoryId);

    const skill = this.skillsRepository.create({
      name,
      category,
    });

    return this.skillsRepository.save(skill);
  }

  async updateSkill({ skillId, name, categoryId }: UpdateSkillInput) {
    const [category, skill] = await Promise.all([
      this.skillCategoriesService.findOneById(categoryId),
      this.findOneById(skillId),
    ]);

    Object.assign(skill, {
      name,
      category,
    });

    return this.skillsRepository.save(skill);
  }

  deleteSkill({ skillId }: DeleteSkillDto) {
    return this.skillsRepository.delete(skillId);
  }
}
