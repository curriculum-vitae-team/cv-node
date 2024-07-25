import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UsersService } from "../users/users.service";
import { MailService } from "src/mail/mail.service";
import { AuthInput, UpdateTokenResult, User } from "../graphql";
import { JwtPayload } from "./strategies/access_token.strategy";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  private async validatePassword({ email, password }: AuthInput) {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await compare(password, user.password))) {
      return user;
    }
  }

  private async signJwt(user: User): Promise<UpdateTokenResult> {
    const { id, email, role } = user;
    const payload: JwtPayload = {
      sub: id,
      email,
      role,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: "10m" }),
      this.jwtService.signAsync(payload, { expiresIn: "7d", secret: process.env.JWT_SECRET_2 }),
    ]);

    return { access_token, refresh_token };
  }

  async updateJwt(userId: string) {
    const user = await this.usersService.findOneById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signJwt(user);
  }

  async login({ email, password }: AuthInput) {
    const user = await this.validatePassword({ email, password });

    if (!user) {
      throw new BadRequestException({ message: "Invalid credentials" });
    }

    const tokens = await this.signJwt(user);

    return { user, ...tokens };
  }

  private async validateEmail({ email }: AuthInput) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException({ message: "User already exists" });
    }
  }

  async signup({ email, password }: AuthInput) {
    await this.validateEmail({ email, password });
    const user = await this.usersService.signup({ email, password });
    const tokens = await this.signJwt(user);

    await this.mailService.sendVerificationEmail(
      email,
      // TODO: use real url
      "https://curriculum-vitae-project.vercel.app"
    );

    return { user, ...tokens };
  }
}
