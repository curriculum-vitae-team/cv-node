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

  findOneById(userId?: string) {
    if (!userId) {
      return null;
    }
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ["profile", "cvs", "department", "position"],
    });
  }

  findOneByIdAndGetProfile(userId: string) {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: ["profile"],
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
      this.profileService.createProfile({}),
    ]);
    const user = this.userRepository.create({
      email: variables.email,
      password,
      profile,
    });
    return this.userRepository.save(user);
  }

  async createUser({
    auth,
    profile: { first_name, last_name },
    cvsIds,
    departmentId,
    positionId,
    role,
  }: CreateUserInput) {
    const [user, cvs, department, position] = await Promise.all([
      this.signup(auth),
      this.cvsService.findMany(cvsIds),
      this.departmentsService.findOneById(departmentId),
      this.positionsService.findOneById(positionId),
    ]);
    const profile = await this.profileService.updateProfile({
      userId: user.id,
      first_name,
      last_name,
    });
    Object.assign(user, {
      profile,
      cvs,
      department,
      position,
      role,
    });
    return this.userRepository.save(user);
  }

  async updateUser({ userId, cvsIds, departmentId, positionId, role }: UpdateUserInput) {
    const [user, department, position] = await Promise.all([
      this.findOneById(userId),
      this.departmentsService.findOneById(departmentId),
      this.positionsService.findOneById(positionId),
    ]);
    if (cvsIds) {
      const cvs = await this.cvsService.findMany(cvsIds);
      user.cvs = cvs;
    }
    if (role) {
      user.role = role;
    }
    Object.assign(user, {
      department,
      position,
    });
    return this.userRepository.save(user);
  }

  deleteUser(userId: string) {
    return this.userRepository.delete(userId);
  }
}
