import { ForbiddenException, Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtResult } from "src/auth/guards/jwt.strategy";
import { UserRole } from "src/graphql";

@Injectable()
export class OwnUserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const jwt = req.user as JwtResult;

    const args = context.getArgByIndex(1);
    const userId = args.user.userId;
    const role = args.user.role;

    const isAdmin = jwt.role === UserRole.Admin;
    const isOwnUser = String(jwt.userId) === userId;

    if (isAdmin) {
      return true;
    }
    if (!isAdmin && isOwnUser && role === UserRole.Admin) {
      throw new ForbiddenException("You cannot assign the Admin role yourself");
    }
    if (isOwnUser) {
      return true;
    }
    return false;
  }
}
