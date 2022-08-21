import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash } from "bcrypt";
import { UserModel } from "./model/user.model";
import { CreateUserInput, UpdateUserInput, AuthInput } from "src/graphql";
import { CvsService } from "src/cvs/cvs.service";
import { ProfileService } from "src/profile/profile.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @Inject(forwardRef(() => CvsService))
    private readonly cvsService: CvsService,
    private readonly profileService: ProfileService
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: ["profile", "cvs"],
    });
  }

  findOneById(id: string) {
    return this.userRepository.findOneOrFail({
      relations: ["profile", "cvs"],
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      relations: ["profile"],
      where: { email },
    });
  }

  async signup(variables: AuthInput) {
    const { email, password } = variables;
    const user = this.userRepository.create({
      email,
      password: await hash(password, 10),
      profile: await this.profileService.create({
        skills: [],
        languages: [],
      }),
    });
    return this.userRepository.save(user);
  }

  async create(variables: CreateUserInput) {
    const { auth, profile, cvsIds } = variables;
    const { email, password } = auth;
    const user = this.userRepository.create({
      email,
      password: await hash(password, 10),
      profile: await this.profileService.create(profile),
      cvs: await this.cvsService.findManyByIds(cvsIds),
    });
    return this.userRepository.save(user);
  }

  async update(id: string, variables: UpdateUserInput) {
    const { profile, cvsIds } = variables;
    const user = await this.findOneById(id);
    if (profile) {
      user.profile = await this.profileService.update(user.profile.id, profile);
    }
    if (cvsIds) {
      user.cvs = await this.cvsService.findManyByIds(cvsIds);
    }
    return this.userRepository.save(user);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
