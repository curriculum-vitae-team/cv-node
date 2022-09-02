import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProjectModel } from "./model/project.model";
import { SkillsService } from "src/skills/skills.service";
import { ProjectInput } from "../graphql";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectModel)
    private readonly projectsRepository: Repository<ProjectModel>,
    private readonly skillsService: SkillsService
  ) {}

  findAll() {
    return this.projectsRepository.find();
  }

  findOneById(id: string) {
    return this.projectsRepository.findOneOrFail({
      relations: ["tech_stack"],
      where: { id },
    });
  }

  findManyByIds(ids: string[]) {
    return this.projectsRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(variables: ProjectInput) {
    const { skillsIds, ...fields } = variables;
    const project = this.projectsRepository.create({
      ...fields,
      tech_stack: await this.skillsService.findMany(skillsIds),
    });
    return this.projectsRepository.save(project);
  }

  async update(id: string, variables: ProjectInput) {
    const { skillsIds, ...fields } = variables;
    const project = await this.findOneById(id);
    Object.assign(project, {
      ...fields,
      tech_stack: await this.skillsService.findMany(skillsIds),
    });
    return this.projectsRepository.save(project);
  }

  delete(id: string) {
    return this.projectsRepository.delete(id);
  }
}
