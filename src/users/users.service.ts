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
    return this.userRepository.findOne({
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
    const [password, profile] = await Promise.all([
      hash(variables.password, 10),
      this.profileService.create({ skills: [], languages: [] }),
    ]);
    const user = this.userRepository.create({
      email: variables.email,
      password,
      profile,
    });
    return this.userRepository.save(user);
  }

  async create(variables: CreateUserInput) {
    const user = await this.signup(variables.auth);
    const [profile, cvs] = await Promise.all([
      this.profileService.update(user.profile.id, variables.profile),
      this.cvsService.findMany(variables.cvsIds),
    ]);
    Object.assign(user, {
      profile,
      cvs,
    });
    return this.userRepository.save(user);
  }

  async update(id: string, variables: UpdateUserInput) {
    const { profile, cvsIds } = variables;
    const user = await this.findOneById(id);
    if (profile) {
      const profileId = user.profile.id;
      user.profile = await this.profileService.update(profileId, profile);
    }
    if (cvsIds) {
      user.cvs = await this.cvsService.findMany(cvsIds);
    }
    return this.userRepository.save(user);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
