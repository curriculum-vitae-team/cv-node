import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserModel } from "./model/user.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>
  ) {}

  async create(createUserInput: CreateUserDto) {
    const exUser = await this.findOneByEmail(createUserInput.email);
    if (exUser) {
      throw new ConflictException({
        message: "User with this email already exists",
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

  private findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
