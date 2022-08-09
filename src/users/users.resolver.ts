import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtGuard } from "src/auth/jwt.guard";
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { SignupDto } from "src/auth/dto/signup.dto";

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query("users")
  // @UseGuards(JwtGuard)
  users() {
    return this.usersService.findAll();
  }

  @Query("user")
  user(@Args("id") id: string) {
    return this.usersService.findOneById(id);
  }

  @Mutation("createUser")
  createUser(@Args("user") args: UserDto, @Args("auth") auth: SignupDto) {
    return this.usersService.create(args, auth);
  }

  @Mutation("updateUser")
  updateUser(@Args("id") id: string, @Args("user") args: UserDto) {
    return this.usersService.update(id, args);
  }

  @Mutation("deleteUser")
  deleteUser(@Args("id") id: string) {
    return this.usersService.delete(id);
  }
}
