import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ForbiddenException, Response } from "@nestjs/common";
import { Roles } from "src/app/roles.decorator";
import { UserRoles } from "src/graphql";
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
  user(@Args("id") id: string) {
    return this.usersService.findOneById(id);
  }

  @Roles(UserRoles.Admin)
  @Mutation("createUser")
  createUser(@Args("user") args: CreateUserDto) {
    return this.usersService.create(args);
  }

  @Mutation("updateUser")
  updateUser(
    @Args("id") id: string,
    @Args("user") args: UpdateUserDto,
    @Response() { req }
  ) {
    // TODO: refactor access control?
    const isAdmin = req.user.role === UserRoles.Admin;
    const isSelfUpdate = req.user.id === Number(id);

    if (!isAdmin && !isSelfUpdate) {
      throw new ForbiddenException();
    }
    if (!isAdmin && isSelfUpdate && args.role === UserRoles.Admin) {
      throw new ForbiddenException("You cannot assign the Admin role yourself");
    }
    return this.usersService.update(id, args);
  }

  @Roles(UserRoles.Admin)
  @Mutation("deleteUser")
  async deleteUser(@Args("id") id: string) {
    const user = await this.usersService.findOneById(id);
    if (user.is_verified) {
      throw new ForbiddenException("You cannot delete a verified User");
    }
    return this.usersService.delete(id);
  }
}
