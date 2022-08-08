import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CvModel } from "./model/cv.model";
import { UsersService } from "../users/users.service";
import { ProjectsService } from "../projects/projects.service";
import { CreateCvInput, UpdateCvInput } from "../graphql";

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
    return this.cvRepository.findOne({
      relations: ["user", "projects"],
      where: { id },
    });
  }

  findManyByIds(ids: string[]) {
    return this.cvRepository.find({
      where: { id: In(ids) },
    });
  }

  async create(createCvInput: CreateCvInput) {
    const { name, description, userId, projectsIds } = createCvInput;
    const cv = this.cvRepository.create({
      name,
      description,
    });
    if (userId) {
      const user = await this.usersService.findOneById(userId);
      cv.user = user;
    }
    const projects = await this.projectsService.findManyByIds(projectsIds);
    cv.projects = projects;
    return this.cvRepository.save(cv);
  }

  async update(updateCvInput: UpdateCvInput) {
    const { id, name, description, userId, projectsIds } = updateCvInput;
    const cv = await this.findOneById(id);
    Object.assign(cv, {
      name,
      description,
    });
    if (userId) {
      const user = await this.usersService.findOneById(userId);
      cv.user = user;
    } else {
      cv.user = null;
    }
    const projects = await this.projectsService.findManyByIds(projectsIds);
    cv.projects = projects;
    return this.cvRepository.save(cv);
  }

  delete(id: string) {
    return this.cvRepository.delete(id);
  }
}
