import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query("login")
  login(@Args("loginInput") args: AuthDto) {
    return this.authService.login(args);
  }

  @Mutation("signup")
  signup(@Args("signupInput") args: AuthDto) {
    return this.authService.signup(args);
  }
}
