import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { LoginInput, LoginOutput, SignupInput, User } from "../graphql";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validate(loginInput: LoginInput) {
    const { email } = loginInput;
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await compare(loginInput.password, user.password))) {
      return user;
    }
  }

  signJwt(user: User): LoginOutput {
    const { id, email } = user;
    const access_token = this.jwtService.sign({ sub: id, email });
    return { user, access_token };
  }

  async login(loginInput: LoginInput) {
    const user = await this.validate(loginInput);
    if (user) {
      return this.signJwt(user);
    }
    throw new BadRequestException({ message: "Invalid credentials" });
  }

  async signup(signupInput: SignupInput) {
    const user = await this.usersService.create(signupInput);
    return this.signJwt(user);
  }
}
