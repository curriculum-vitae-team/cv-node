import { ParseIntPipe, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtGuard } from "src/auth/jwt.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Resolver("user")
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query("users")
  @UseGuards(JwtGuard)
  getUsers() {
    return this.usersService.findAll();
  }

  @Query("user")
  @UseGuards(JwtGuard)
  getUser(@Args("id") id: string) {
    return this.usersService.findOneById(id);
  }

  @Mutation("createUser")
  @UseGuards(JwtGuard)
  createUser(@Args("createUserInput") args: CreateUserDto) {
    return this.usersService.create(args);
  }
}
