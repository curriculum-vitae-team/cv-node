import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { CvModel } from "./model/cv.model";
import { CreateCvInput } from "../graphql";

@Injectable()
export class CvsService {
  constructor(
    @InjectRepository(CvModel)
    private readonly cvRepository: Repository<CvModel>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService
  ) {}

  findAll() {
    return this.cvRepository.find({
      relations: ["user"],
    });
  }

  findOneById(id: string) {
    return this.cvRepository.findOne({
      relations: ["user"],
      where: { id },
    });
  }

  findManyById(ids: string[]) {
    return this.cvRepository.find({
      where: { id: In(ids) },
    });
  }

  async create({ userId, ...createCvInput }: CreateCvInput) {
    const cv = this.cvRepository.create(createCvInput);
    const user = await this.usersService.findOneById(userId);
    if (user) {
      cv.user = user;
      user.cvs.push(cv);
      await this.usersService.save(user);
    }
    return this.save(cv);
  }

  update() {}

  save(cv: CvModel) {
    return this.cvRepository.save(cv);
  }

  delete(id: string) {
    return this.cvRepository.delete(id);
  }
}
