import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Public } from "./guards/public.decorator";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";
import { UseGuards } from "@nestjs/common";
import { RefreshTokenGuard } from "./guards/refresh_token.guard";
import { GetUserId } from "src/app/decorators/get_user_id.decorator";

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
  signup(@Args("auth") args: SignupDto) {
    return this.authService.signup(args);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation("updateToken")
  updateToken(@GetUserId() userId: string) {
    return this.authService.updateJwt(userId);
  }
}
