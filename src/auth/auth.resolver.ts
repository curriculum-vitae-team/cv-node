import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Public } from "./public.decorator";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";

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
}
