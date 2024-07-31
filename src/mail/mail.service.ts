import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { VerifyMailInput } from "src/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { MailModel } from "./model/mail.model";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(MailModel)
    private readonly mailRepository: Repository<MailModel>,
    private readonly mailerService: MailerService,
    private readonly usersService: UsersService
  ) {}

  findOneByEmail(email: string) {
    return this.mailRepository.findOne({
      where: { email },
    });
  }

  createOneTimePassword() {
    return [...Array(6)].map(() => (Math.random() * 10) | 0).join("");
  }

  async sendVerificationEmail(email: string, url: string) {
    let mail = await this.findOneByEmail(email);
    const otp = this.createOneTimePassword();

    if (mail) {
      mail.otp = otp;
    } else {
      mail = this.mailRepository.create({ email, otp });
    }
    await this.mailRepository.save(mail);

    return this.mailerService.sendMail({
      to: email,
      subject: "Please confirm your email address.",
      template: "./confirm-email.hbs",
      context: {
        code: otp,
        duration: "2 hours",
        url,
        from: process.env.MAIL_FROM,
      },
    });
  }

  async verifyEmail({ otp }: VerifyMailInput, email: string) {
    const mail = await this.mailRepository.findOne({
      where: { email, otp },
    });

    if (mail) {
      await this.mailRepository.delete(mail.id);
      await this.usersService.verifyUser(mail.email);
      return;
    }

    throw new BadRequestException({ message: "Invalid credentials" });
  }

  sendResetPasswordEmail(email: string, url: string) {
    return this.mailerService.sendMail({
      to: email,
      subject: "Password reset.",
      template: "./reset_password.hbs",
      context: {
        duration: "10 minutes",
        url,
        from: process.env.MAIL_FROM,
      },
    });
  }

  async verifyResetPasswordCode() {}
}
