import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CvModel } from "./model/cv.model";
import { UsersService } from "../users/users.service";
import { ProjectsService } from "../projects/projects.service";
import {
  AddCvSkillInput,
  CreateCvInput,
  DeleteCvInput,
  DeleteCvSkillInput,
  UpdateCvInput,
  UpdateCvSkillInput,
} from "../graphql";
import { CvProjectModel } from "../cv_projects/model/cv_project.model";

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(CvModel)
    private readonly cvRepository: Repository<CvModel>,
    @InjectRepository(CvProjectModel)
    private readonly cvProjectRepository: Repository<CvProjectModel>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectsService: ProjectsService
  ) {}

  findAll() {
    return this.cvRepository.find({
      relations: ["user", "projects"],
    });
  }

  findMany(ids: string[]) {
    return this.cvRepository.find({
      where: { id: In(ids) },
    });
  }

  findOneById(cvId: string) {
    return this.cvRepository.findOne({
      where: { id: cvId },
      relations: ["user", "projects"],
    });
  }

  findOneByIdAndJoin(cvId: string) {
    return this.cvRepository.findOne({
      where: { id: cvId },
      relations: ["user", "user.profile", "projects", "projects.project"],
      // join: {
      //   alias: "cv",
      //   leftJoinAndSelect: {
      //     user: "cv.user",
      //     profile: "user.profile",
      //     department: "user.department",
      //     position: "user.position",
      //   },
      // },
    });
  }

  async createCv({ name, education, description, userId }: CreateCvInput) {
    const user = await this.usersService.findOneById(userId);
    const cv = this.cvRepository.create({
      name,
      education,
      description,
      user,
      skills: user.profile.skills,
      languages: user.profile.languages,
    });
    return this.cvRepository.save(cv);
  }

  async updateCv({ cvId, name, education, description }: UpdateCvInput) {
    const cv = await this.findOneById(cvId);
    cv.name = name;
    cv.education = education;
    cv.description = description;
    return this.cvRepository.save(cv);
  }

  deleteCv({ cvId }: DeleteCvInput) {
    return this.cvRepository.delete(cvId);
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
