import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "src/graphql";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  confirmEmailAfterSignUp(user: User, origin: string, token: string) {
    return this.mailerService.sendMail({
      to: user.email,
      subject: "Please confirm your email address.",
      template: "./confirm-email.hbs",
      context: {
        email: user.email,
        url: origin + `/verify?token=${token}`,
      },
    });
  }
}
