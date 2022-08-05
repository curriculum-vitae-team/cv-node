import { Injectable } from "@nestjs/common";
import { LoginInput, SignupInput } from "src/graphql";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser({ email, password }: LoginInput) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      return user;
    }
  }

  async createUser(signUpInput: SignupInput) {
    const user = await this.usersService.create(signUpInput);
    return user;
  }

  async createJwt() {
    // TODO: JWT generation
    const token = "";
    return token;
  }
}
