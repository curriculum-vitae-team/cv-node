import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  createVerificationCode() {
    return [...Array(6)].map(() => (Math.random() * 10) | 0).join("");
  }

  confirmEmailAfterSignUp(email: string, origin: string) {
    const code = this.createVerificationCode();
    return this.mailerService.sendMail({
      to: email,
      subject: "Please confirm your email address.",
      template: "./confirm-email.hbs",
      context: {
        code,
        url: origin + `/verify?code=${code}`,
        from: process.env.MAIL_FROM,
      },
    });
  }
}
