import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Response } from "@nestjs/common";
import { MailService } from "./mail.service";
import { VerifyMailDto } from "./dto/mail.dto";

@Resolver()
export class MailResolver {
  constructor(private readonly mailService: MailService) {}

  @Mutation("verifyMail")
  verifyMail(@Args("mail") args: VerifyMailDto, @Response() { req }) {
    return this.mailService.verifyEmail(args, req.user.email);
  }
}
