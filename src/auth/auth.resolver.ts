import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignupDto } from "./dto/signup.dto";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query("login")
  login(@Args("loginInput") args: LoginDto) {
    return this.authService.login(args);
  }

  @Mutation("signup")
  signup(@Args("signupInput") args: SignupDto) {
    return this.authService.signup(args);
  }
}
