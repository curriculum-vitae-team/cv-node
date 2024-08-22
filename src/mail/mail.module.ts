import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { UsersModule } from "src/users/users.module";
import { MailService } from "./mail.service";
import { MailModel } from "./model/mail.model";
import { MailResolver } from "./mail.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([MailModel]),
    MailerModule.forRoot({
      transport: {
        pool: true,
        url: process.env.SMTP_URL,
      },
      defaults: {
        from: `"Curriculum Vitae" <${process.env.MAIL_FROM}>`,
      },
      template: {
        dir: "dist/mail/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UsersModule,
  ],
  providers: [MailResolver, MailService],
  exports: [MailService],
})
export class MailModule {}
