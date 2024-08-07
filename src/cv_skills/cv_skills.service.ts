import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddCvSkillInput, DeleteCvSkillInput, UpdateCvSkillInput } from "../graphql";
import { CvModel } from "src/cvs/model/cv.model";

@Injectable()
export class CvSkillsService {
  constructor(
    @InjectRepository(CvModel)
    private readonly cvRepository: Repository<CvModel>
  ) {}

  findOneById(cvId: string) {
    return this.cvRepository.findOne({
      where: { id: cvId },
    });
  }

  async addCvSkill({ cvId, name, category, mastery }: AddCvSkillInput) {
    const cv = await this.findOneById(cvId);

    cv.skills.push({ name, category, mastery });

    return this.cvRepository.save(cv);
  }

  async updateCvSkill({ cvId, name, mastery }: UpdateCvSkillInput) {
    const cv = await this.findOneById(cvId);

    cv.skills = cv.skills.map((skill) => {
      if (skill.name === name) {
        return { name, category: skill.category, mastery };
      }

      return skill;
    });

    return this.cvRepository.save(cv);
  }

  async deleteCvSkill({ cvId, name }: DeleteCvSkillInput) {
    const cv = await this.findOneById(cvId);

    cv.skills = cv.skills.filter((skill) => !name.includes(skill.name));

    return this.cvRepository.save(cv);
  }
}
