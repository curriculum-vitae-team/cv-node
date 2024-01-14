import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ForbiddenException, UseGuards } from "@nestjs/common";
import { Roles } from "src/app/roles.decorator";
import { SelfGuard } from "src/app/users.guard";
import { UserRole } from "src/graphql";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query("users")
  users() {
    return this.usersService.findAll();
  }

  @Query("user")
  user(@Args("userId") userId: string) {
    return this.usersService.findOneById(userId);
  }

  @Roles(UserRole.Admin)
  @Mutation("createUser")
  createUser(@Args("user") args: CreateUserDto) {
    return this.usersService.createUser(args);
  }

  @UseGuards(SelfGuard)
  @Mutation("updateUser")
  updateUser(@Args("user") args: UpdateUserDto) {
    return this.usersService.updateUser(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("deleteUser")
  async deleteUser(@Args("userId") userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (user.is_verified) {
      throw new ForbiddenException("You cannot delete a verified User");
    }
    return this.usersService.deleteUser(userId);
  }
}
