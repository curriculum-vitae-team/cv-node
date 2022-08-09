import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { AuthInput, AuthResult, User } from "../graphql";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validate({ email, password }: AuthInput) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
  }

  signJwt(user: User): AuthResult {
    const { id, email } = user;
    const access_token = this.jwtService.sign({ sub: id, email });
    return { user, access_token };
  }

  async login(variables: AuthInput) {
    const user = await this.validate(variables);
    if (user) {
      return this.signJwt(user);
    }
    throw new BadRequestException({ message: "Invalid credentials" });
  }

  async signup(variables: AuthInput) {
    const user = await this.usersService.signup(variables);
    return this.signJwt(user);
  }
}
