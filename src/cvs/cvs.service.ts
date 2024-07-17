import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CvModel } from "./model/cv.model";
import { UsersService } from "../users/users.service";
import { ProjectsService } from "../projects/projects.service";
import {
  AddCvProjectInput,
  AddCvSkillInput,
  CreateCvInput,
  DeleteCvInput,
  DeleteCvSkillInput,
  RemoveCvProjectInput,
  UpdateCvInput,
  UpdateCvProjectInput,
  UpdateCvSkillInput,
} from "../graphql";
import { CvProjectModel } from "./model/cv-project.model";

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

  async addCvProject({
    cvId,
    projectId,
    start_date,
    end_date,
    roles,
    responsibilities,
  }: AddCvProjectInput) {
    const [cv, project] = await Promise.all([
      this.findOneByIdAndJoin(cvId),
      this.projectsService.findOneById(projectId),
    ]);

    if (!project) {
      throw new BadRequestException({
        message: "Project not found",
      });
    }

    if (cv.projects.find(({ project }) => String(project.id) === projectId)) {
      throw new BadRequestException({
        message: "The project has already been added to this resume",
      });
    }

    const cvProject = this.cvProjectRepository.create({
      project,
      start_date,
      end_date,
      roles,
      responsibilities,
    });

    cv.projects.push(cvProject);
    await this.cvProjectRepository.save(cvProject);
    await this.cvRepository.save(cv);

    return cv;
  }

  async updateCvProject({
    cvId,
    projectId,
    start_date,
    end_date = null,
    roles,
    responsibilities,
  }: UpdateCvProjectInput) {
    const cv = await this.findOneByIdAndJoin(cvId);
    const cvProject = cv.projects.find(({ project }) => String(project.id) === projectId);

    cvProject.start_date = start_date;
    cvProject.end_date = end_date;
    cvProject.roles = roles;
    cvProject.responsibilities = responsibilities;

    await this.cvProjectRepository.save(cvProject);

    return cv;
  }

  async removeCvProject({ cvId, projectId }: RemoveCvProjectInput) {
    const cv = await this.findOneByIdAndJoin(cvId);

    cv.projects = cv.projects.filter(({ project }) => String(project.id) !== projectId);
    await this.cvProjectRepository.delete({ project: { id: projectId } });

    return cv;
  }
}
