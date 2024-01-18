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

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(CvModel)
    private readonly cvRepository: Repository<CvModel>,
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

  findOneByIdAndJoinProfile(cvId: string) {
    return this.cvRepository.findOne({
      where: { id: cvId },
      relations: ["projects"],
      join: {
        alias: "cv",
        leftJoinAndSelect: {
          user: "cv.user",
          profile: "user.profile",
          department: "user.department",
          position: "user.position",
        },
      },
    });
  }

  async createCv({ name, description, userId, projectsIds }: CreateCvInput) {
    const [user, projects] = await Promise.all([
      this.usersService.findOneById(userId),
      this.projectsService.findMany(projectsIds),
    ]);
    const cv = this.cvRepository.create({
      name,
      description,
      user,
      skills: user.profile.skills,
      projects,
    });
    return this.cvRepository.save(cv);
  }

  async updateCv({ cvId, name, description, projectsIds }: UpdateCvInput) {
    const [cv, projects] = await Promise.all([
      this.findOneById(cvId),
      this.projectsService.findMany(projectsIds),
    ]);
    cv.name = name;
    cv.description = description;
    cv.projects = projects;
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
