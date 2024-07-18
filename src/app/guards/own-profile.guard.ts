import { Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtPayload } from "src/auth/strategies/access_token.strategy";
import { UserRole } from "src/graphql";

@Injectable()
export class OwnProfileGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const jwt = req.user as JwtPayload;

    const args = context.getArgByIndex(1);
    const userId = args.profile?.userId || args.skill?.userId || args.avatar?.userId;

    const isAdmin = jwt.role === UserRole.Admin;
    const isOwnProfile = String(jwt.sub) === userId;

    if (isAdmin) {
      return true;
    }
    if (isOwnProfile) {
      return true;
    }
    return false;
  }
}
