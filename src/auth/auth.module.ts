import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { MailModule } from "src/mail/mail.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy } from "./strategies/access_token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh_token.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UsersModule,
    MailModule,
  ],
  providers: [AuthResolver, AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
