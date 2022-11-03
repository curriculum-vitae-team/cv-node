import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { MailService } from "./mail.service";

console.log(process.env.SMTP_URL);

@Module({
  imports: [
    MailerModule.forRoot({
      transport: process.env.SMTP_URL,
      defaults: {
        from: `"Curriculum Vitae Team" <${process.env.MAIL_FROM}>`,
      },
      template: {
        dir: "dist/mail/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
