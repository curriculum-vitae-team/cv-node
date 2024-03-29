import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProjectModel } from "./model/project.model";
import { SkillsService } from "src/skills/skills.service";
import { CreateProjectInput, UpdateProjectInput, DeleteProjectInput } from "../graphql";

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

  findMany(projectIds: string[]) {
    return this.projectsRepository.find({
      where: { id: In(projectIds) },
    });
  }

  findOneById(projectId: string) {
    return this.projectsRepository.findOne({
      where: { id: projectId },
      relations: ["tech_stack"],
    });
  }

  async createProject({
    name,
    internal_name,
    domain,
    description,
    start_date,
    end_date,
    team_size,
  }: CreateProjectInput) {
    const project = this.projectsRepository.create({
      name,
      internal_name,
      domain,
      description,
      start_date,
      end_date,
      team_size,
    });
    return this.projectsRepository.save(project);
  }

  async updateProject({
    projectId,
    name,
    internal_name,
    domain,
    description,
    start_date,
    end_date,
    team_size,
  }: UpdateProjectInput) {
    const project = await this.findOneById(projectId);
    Object.assign(project, {
      name,
      internal_name,
      domain,
      description,
      start_date,
      end_date,
      team_size,
    });
    return this.projectsRepository.save(project);
  }

  deleteProject({ projectId }: DeleteProjectInput) {
    return this.projectsRepository.delete(projectId);
  }
}
