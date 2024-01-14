import { Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtResult } from "src/auth/guards/jwt.strategy";
import { UserRole } from "src/graphql";

@Injectable()
export class OwnProfileGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const jwt = req.user as JwtResult;

    const args = context.getArgByIndex(1);
    const profileId = args.profile?.profileId || args.skill?.profileId || args.avatar?.profileId;

    const isAdmin = jwt.role === UserRole.Admin;
    const isOwnProfile = String(jwt.profileId) === profileId;

    if (isAdmin) {
      return true;
    }
    if (isOwnProfile) {
      return true;
    }
    return false;
  }
}
