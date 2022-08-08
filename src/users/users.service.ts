import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash } from "bcrypt";
import { UserModel } from "./model/user.model";
import { CreateUserInput, SignupInput, UpdateUserInput } from "src/graphql";
import { CvsService } from "src/cvs/cvs.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @Inject(forwardRef(() => CvsService))
    private readonly cvsService: CvsService
  ) {}

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

  async signup(signupInput: SignupInput) {
    const { email } = signupInput;
    const password = await hash(signupInput.password, 10);
    const user = this.userRepository.create({
      email,
      password,
    });
    return this.userRepository.save(user);
  }

  async create(createUserInput: CreateUserInput) {
    const { email, first_name, last_name, cvsIds } = createUserInput;
    const password = await hash(createUserInput.password, 10);
    const user = this.userRepository.create({
      email,
      password,
      first_name,
      last_name,
    });
    const cvs = await this.cvsService.findManyByIds(cvsIds);
    user.cvs = cvs;
    return this.userRepository.save(user);
  }

  async update(updateUserInput: UpdateUserInput) {
    const { id, first_name, last_name, cvsIds } = updateUserInput;
    const user = await this.findOneById(id);
    Object.assign(user, {
      first_name,
      last_name,
    });
    const cvs = await this.cvsService.findManyByIds(cvsIds);
    user.cvs = cvs;
    return this.userRepository.save(user);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
