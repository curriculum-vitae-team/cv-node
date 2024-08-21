import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SkillCategoryModel } from "./model/skill_category.model";

@Injectable()
export class SkillCategoriesService {
  constructor(
    @InjectRepository(SkillCategoryModel)
    private readonly skillCategoriesRepository: Repository<SkillCategoryModel>
  ) {}

  findAll() {
    return this.skillCategoriesRepository.find({
      relations: ["parent", "children"],
      order: {
        order: "asc",
      },
    });
  }

  findOneById(categoryId?: string) {
    if (!categoryId) {
      return null;
    }

    return this.skillCategoriesRepository.findOne({
      where: { id: categoryId },
    });
  }
}
