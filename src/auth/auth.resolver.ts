import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Public } from "./guards/public.decorator";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";
import { UseGuards } from "@nestjs/common";
import { RefreshTokenGuard } from "./guards/refresh_token.guard";
import { GetUserId } from "src/app/decorators/get_user_id.decorator";
import { ForgotPasswordDto } from "./dto/forgot_password.dto";
import { GetOrigin } from "src/app/decorators/get_origin.decorator";
import { ResetPasswordDto } from "./dto/reset_password.dto";
import { GetToken } from "src/app/decorators/get_token.decorator";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Query("login")
  login(@Args("auth") args: LoginDto) {
    return this.authService.login(args);
  }

  @Public()
  @Mutation("signup")
  signup(@Args("auth") args: SignupDto, @GetOrigin() origin: string) {
    return this.authService.signup(args, origin);
  }

  @Public()
  @Mutation("forgotPassword")
  forgotPassword(@Args("auth") args: ForgotPasswordDto, @GetOrigin() origin: string) {
    return this.authService.forgotPassword(args, origin);
  }

  @Public()
  @Mutation("resetPassword")
  resetPassword(@Args("auth") args: ResetPasswordDto, @GetToken() token: string) {
    return this.authService.resetPassword(args, token);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation("updateToken")
  updateToken(@GetUserId() userId: string) {
    return this.authService.updateJwt(userId);
  }
}
