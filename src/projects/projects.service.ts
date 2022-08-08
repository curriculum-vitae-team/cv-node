import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProjectModel } from "./model/project.model";
import { CreateProjectInput, UpdateProjectInput } from "../graphql";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectModel)
    private readonly projectsRepository: Repository<ProjectModel>
  ) {}

  async create(createProjectInput: CreateProjectInput) {
    const project = this.projectsRepository.create(createProjectInput);
    return this.projectsRepository.save(project);
  }

  async update(updateProjectInput: UpdateProjectInput) {
    const {
      id,
      name,
      internal_name,
      description,
      domain,
      start_date,
      end_date,
    } = updateProjectInput;
    const project = await this.findOneById(id);
    Object.assign(project, {
      name,
      internal_name,
      description,
      domain,
      start_date,
      end_date,
    });
    return this.projectsRepository.save(project);
  }

  delete(id: string) {
    return this.projectsRepository.delete(id);
  }

  findAll() {
    return this.projectsRepository.find();
  }

  findOneById(id: string) {
    return this.projectsRepository.findOne({
      where: { id },
    });
  }

  findManyByIds(ids: string[]) {
    return this.projectsRepository.find({
      where: { id: In(ids) },
    });
  }
}
