import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserModel } from "./model/user.model";
import { CreateUserInput } from "src/graphql";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const oldUser = await this.findOneByEmail(createUserInput.email);
    if (oldUser) {
      throw new BadRequestException({
        message: "User with such email already exists",
      });
    }
    const user = this.userRepository.create(createUserInput);
    return await this.userRepository.save(user);
  }

  update() {}

  delete() {}

  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
