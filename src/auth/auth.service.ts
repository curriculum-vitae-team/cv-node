import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UsersService } from "../users/users.service";
import { MailService } from "src/mail/mail.service";
import { AuthInput, AuthResult, User } from "../graphql";
import { JwtPayload } from "./guards/jwt.strategy";

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
    const { id, email, role, profile } = user;
    const payload: JwtPayload = {
      sub: id,
      email,
      role,
    };
    const access_token = this.jwtService.sign(payload);
    return { user, access_token };
  }

  async login(variables: AuthInput) {
    const user = await this.validate(variables);
    if (user) {
      return this.signJwt(user);
    }
    throw new BadRequestException({ message: "Invalid credentials" });
  }

  async signup({ email, password }: AuthInput) {
    const user = await this.usersService.signup({ email, password });
    const result = this.signJwt(user);

    await this.mailService.sendVerificationEmail(
      email,
      // TODO: use real url
      "https://curriculum-vitae-project.vercel.app"
    );

    return result;
  }
}
