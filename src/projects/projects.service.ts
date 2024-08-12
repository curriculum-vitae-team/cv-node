import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProjectModel } from "./model/project.model";
import { CreateProjectInput, UpdateProjectInput, DeleteProjectInput } from "../graphql";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectModel)
    private readonly projectsRepository: Repository<ProjectModel>
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
    });
  }

  async createProject({ name, domain, description, start_date, end_date }: CreateProjectInput) {
    const project = this.projectsRepository.create({
      name,
      domain,
      description,
      start_date,
      end_date,
    });

    return this.projectsRepository.save(project);
  }

  async updateProject({
    projectId,
    name,
    domain,
    description,
    start_date,
    end_date,
  }: UpdateProjectInput) {
    const project = await this.findOneById(projectId);

    Object.assign(project, {
      name,
      domain,
      description,
      start_date,
      end_date,
    });

    return this.projectsRepository.save(project);
  }

  deleteProject({ projectId }: DeleteProjectInput) {
    return this.projectsRepository.delete(projectId);
  }
}
