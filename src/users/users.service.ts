import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hash } from "bcrypt";
import { UserModel } from "./model/user.model";
import { CreateUserInput, UpdateUserInput, AuthInput } from "src/graphql";
import { CvsService } from "src/cvs/cvs.service";
import { ProfileService } from "src/profile/profile.service";
import { DepartmentsService } from "src/departments/departments.service";
import { PositionsService } from "src/positions/positions.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @Inject(forwardRef(() => CvsService))
    private readonly cvsService: CvsService,
    private readonly profileService: ProfileService,
    private readonly departmentsService: DepartmentsService,
    private readonly positionsService: PositionsService
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: ["profile", "cvs", "department", "position"],
    });
  }

  findOneById(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ["profile", "cvs", "department", "position"],
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ["profile"],
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
    const { role, cvsIds, departmentId, positionId } = variables;
    const [user, cvs, department, position] = await Promise.all([
      this.signup(variables.auth),
      this.cvsService.findMany(cvsIds),
      this.departmentsService.findOneById(departmentId),
      this.positionsService.findOneById(positionId),
    ]);
    const profile = await this.profileService.update(
      user.profile.id,
      variables.profile
    );
    Object.assign(user, {
      profile,
      cvs,
      department,
      position,
      role,
    });
    return this.userRepository.save(user);
  }

  async update(id: string, variables: UpdateUserInput) {
    const { cvsIds, departmentId, positionId } = variables;
    const [user, cvs, department, position] = await Promise.all([
      this.findOneById(id),
      this.cvsService.findMany(cvsIds),
      this.departmentsService.findOneById(departmentId),
      this.positionsService.findOneById(positionId),
    ]);
    const profile = await this.profileService.update(
      user.profile.id,
      variables.profile
    );
    Object.assign(user, {
      profile,
      cvs,
      department,
      position,
    });
    return this.userRepository.save(user);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }
}
