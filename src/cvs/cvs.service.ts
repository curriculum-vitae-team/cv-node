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

  findMany(ids: string[]) {
    return this.cvRepository.find({
      where: { id: In(ids) },
    });
  }

  findOneById(id: string) {
    return this.cvRepository.findOne({
      where: { id },
      relations: ["user", "projects"],
    });
  }

  findOneByIdAndJoinProfile(id: string) {
    return this.cvRepository.findOne({
      where: { id },
      relations: ["projects"],
      join: {
        alias: "cv",
        leftJoinAndSelect: {
          user: "cv.user",
          profile: "user.profile",
          department: "profile.department",
          position: "profile.position",
        },
      },
    });
  }

  async create(variables: CvInput) {
    const { userId, projectsIds, ...fields } = variables;
    const [user, projects] = await Promise.all([
      this.usersService.findOneById(userId),
      this.projectsService.findMany(projectsIds),
    ]);
    const cv = this.cvRepository.create({
      ...fields,
      user,
      projects,
    });
    return this.cvRepository.save(cv);
  }

  async update(id: string, variables: CvInput) {
    const { userId, projectsIds, ...fields } = variables;
    const [cv, user, projects] = await Promise.all([
      this.findOneById(id),
      this.usersService.findOneById(userId),
      this.projectsService.findMany(projectsIds),
    ]);
    Object.assign(cv, {
      ...fields,
      user,
      projects,
    });
    return this.cvRepository.save(cv);
  }

  delete(id: string) {
    return this.cvRepository.delete(id);
  }

  async unbind(id: string) {
    const cv = await this.findOneById(id);
    Object.assign(cv, {
      user: null,
    });
    return this.cvRepository.save(cv);
  }
}
