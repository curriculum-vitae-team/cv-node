import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/roles.decorator";
import { UserRoles } from "./model/user.roles";
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

  // TODO: user can update only himself
  // admin can update anyone
  @Mutation("updateUser")
  updateUser(@Args("id") id: string, @Args("user") args: UpdateUserDto) {
    return this.usersService.update(id, args);
  }

  @Roles(UserRoles.Admin)
  @Mutation("deleteUser")
  deleteUser(@Args("id") id: string) {
    return this.usersService.delete(id);
  }
}
