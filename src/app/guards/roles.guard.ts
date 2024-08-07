import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { UserRole } from "src/graphql";
import { JwtPayload } from "src/auth/strategies/access_token.strategy";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<UserRole[]>("roles", context.getHandler());

    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const jwt = req.user as JwtPayload;

    return roles.includes(jwt.role);
  }
}
