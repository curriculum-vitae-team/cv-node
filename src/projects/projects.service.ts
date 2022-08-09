import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { ProjectModel } from "./model/project.model";
import { ProjectInput } from "../graphql";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectModel)
    private readonly projectsRepository: Repository<ProjectModel>
  ) {}

  findAll() {
    return this.projectsRepository.find();
  }

  findOneById(id: string) {
    return this.projectsRepository.findOneOrFail({
      where: { id },
    });
  }

  findManyByIds(ids: string[]) {
    return this.projectsRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(variables: ProjectInput) {
    const project = this.projectsRepository.create(variables);
    return this.projectsRepository.save(project);
  }

  async update(id: string, variables: ProjectInput) {
    const project = await this.findOneById(id);
    Object.assign(project, {
      ...variables,
    });
    return this.projectsRepository.save(project);
  }

  delete(id: string) {
    return this.projectsRepository.delete(id);
  }
}
