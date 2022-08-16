import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CvModel } from "./model/cv.model";
import { UsersService } from "../users/users.service";
import { ProjectsService } from "../projects/projects.service";
import { CvInput } from "../graphql";

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

  findOneById(id: string) {
    return this.cvRepository.findOneOrFail({
      relations: ["user", "projects"],
      where: { id },
    });
  }

  findManyByIds(ids: string[]) {
    return this.cvRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(variables: CvInput) {
    const { name, description, userId, projectsIds } = variables;
    const cv = this.cvRepository.create({
      name,
      description,
      user: await this.usersService.findOneById(userId),
      projects: await this.projectsService.findManyByIds(projectsIds),
    });
    return this.cvRepository.save(cv);
  }

  async update(id: string, variables: CvInput) {
    const { name, description, userId, projectsIds } = variables;
    const cv = await this.findOneById(id);
    Object.assign(cv, {
      name,
      description,
      user: await this.usersService.findOneById(userId),
      projects: await this.projectsService.findManyByIds(projectsIds),
    });
    return this.cvRepository.save(cv);
  }

  delete(id: string) {
    return this.cvRepository.delete(id);
  }

  async unbind(id: string) {
    const cv = await this.findOneById(id);
    cv.user = null;
    return this.cvRepository.save(cv);
  }
}
