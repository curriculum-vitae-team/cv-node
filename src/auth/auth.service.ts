import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthInput, AuthOutput, User } from "src/graphql";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validate({ email, password }: AuthInput) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      return user;
    }
  }

  signJwt(user: User): AuthOutput {
    const { id, email } = user;
    const access_token = this.jwtService.sign({ sub: id, email });
    return { user, access_token };
  }

  async login(loginInput: AuthInput) {
    const user = await this.validate(loginInput);
    if (user) {
      return this.signJwt(user);
    }
    throw new BadRequestException({ message: "Invalid credentials" });
  }

  async signup(signupInput: AuthInput) {
    const user = await this.usersService.create(signupInput);
    return this.signJwt(user);
  }
}
