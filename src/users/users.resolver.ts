import { ParseIntPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserModel } from "./model/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Resolver("user")
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query("users")
  getUsers() {
    return this.usersService.findAll();
  }

  @Query("user")
  getUser(@Args("id", ParseIntPipe) id: number) {
    return this.usersService.findOneById(id);
  }

  @Mutation("createUser")
  createUser(@Args("createUserInput") args: CreateUserDto) {
    return this.usersService.create(args);
  }
}
