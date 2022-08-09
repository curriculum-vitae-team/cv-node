import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query("login")
  login(@Args("auth") args: LoginDto) {
    return this.authService.login(args);
  }

  @Mutation("signup")
  signup(@Args("auth") args: SignupDto) {
    return this.authService.signup(args);
  }
}
