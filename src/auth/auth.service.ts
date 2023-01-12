import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UsersService } from "../users/users.service";
import { MailService } from "src/mail/mail.service";
import { AuthInput, AuthResult, User } from "../graphql";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async validate({ email, password }: AuthInput) {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
  }

  signJwt(user: User): AuthResult {
    const { id, email, role } = user;
    const access_token = this.jwtService.sign({ sub: id, email, role });
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
    const result = this.signJwt(user);
    this.mailService.confirmEmailAfterSignUp(
      user,
      // TODO: use real url
      "https://curriculum-vitae-project.vercel.app"
    );
    return result;
  }
}
