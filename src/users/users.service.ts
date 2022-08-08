import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from "@nestjs/common";
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
    const cvs = await this.cvsService.findManyById(cvsIds);
    user.cvs = cvs;
    return this.userRepository.save(user);
  }

  async update(updateUserInput: UpdateUserInput) {
    const { id, first_name, last_name, cvsIds } = updateUserInput;
    const user = await this.findOneById(id);
    if (user) {
      user.first_name = first_name;
      user.last_name = last_name;
      const cvs = await this.cvsService.findManyById(cvsIds);
      user.cvs = cvs;
      return this.userRepository.save(user);
    }
    throw new BadRequestException({ message: "User does not exist" });
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
