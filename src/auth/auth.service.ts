import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { captureException } from "@sentry/nestjs";
import { compare } from "bcrypt";
import { UsersService } from "../users/users.service";
import { MailService } from "src/mail/mail.service";
import {
  AuthInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  UpdateTokenResult,
  User,
} from "../graphql";
import { JwtPayload } from "./strategies/access_token.strategy";
import { randomBytesAsync } from "src/app/util/random_bytes_async";

const invalidCredentials = new BadRequestException({ message: "Invalid credentials" });
const userAlreadyExists = new BadRequestException({ message: "User already exists" });
const failedToSendEmail = new ServiceUnavailableException({ message: "Failed to send email" });
const actionExpired = new UnauthorizedException({ message: "Action expired" });

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
      throw invalidCredentials;
    }

    const tokens = await this.signJwt(user);

    return { user, ...tokens };
  }

  private async validateEmail({ email }: AuthInput) {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      throw userAlreadyExists;
    }
  }

  async signup({ email, password }: AuthInput, origin: string) {
    await this.validateEmail({ email, password });

    const user = await this.usersService.signup({ email, password });
    const tokens = await this.signJwt(user);
    const url = `${origin}/verify-email`;

    await this.mailService.sendVerificationEmail(email, url).catch((error) => {
      captureException(error, { data: "verification email" });
    });

    return { user, ...tokens };
  }

  async forgotPassword({ email }: ForgotPasswordInput, origin: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw failedToSendEmail;
    }

    const jti = (await randomBytesAsync(16)).toString("hex");
    const payload: JwtPayload = {
      sub: user.id,
      email,
      role: user.role,
      jti,
    };
    const token = await this.jwtService.signAsync(payload, { expiresIn: "10m" });
    const url = `${origin}/reset-password?token=${token}`;

    await this.mailService.sendResetPasswordEmail(email, url).catch((error) => {
      captureException(error, { data: "reset password email" });
      throw failedToSendEmail;
    });

    return;
  }

  async resetPassword({ newPassword }: ResetPasswordInput, token: string) {
    const { email } = await this.jwtService.verifyAsync<JwtPayload>(token).catch(() => {
      throw actionExpired;
    });

    await this.usersService.updatePassword(email, newPassword);

    return;
  }
}
