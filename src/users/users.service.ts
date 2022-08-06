import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserModel } from "./model/user.model";
import { CreateUserInput } from "src/graphql";
import { CvsService } from "src/cvs/cvs.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @Inject(forwardRef(() => CvsService))
    private readonly cvsService: CvsService
  ) {}

  async create({ cvsIds, ...createUserInput }: CreateUserInput) {
    const user = this.userRepository.create(createUserInput);
    if (cvsIds) {
      const cvs = await this.cvsService.findManyById(cvsIds);
      await Promise.all(cvs.map((cv) => this.cvsService.save(cv)));
      user.cvs = cvs;
    }
    return this.save(user);
  }

  update() {}

  save(user: UserModel) {
    return this.userRepository.save(user);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }

  findAll() {
    return this.userRepository.find({
      relations: ["cvs"],
    });
  }

  findOneById(id: string) {
    return this.userRepository.findOne({
      relations: ["cvs"],
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
