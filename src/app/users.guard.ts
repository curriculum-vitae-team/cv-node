import { ForbiddenException, Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User, UserRole } from "src/graphql";

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user = req.user as User;
    const args = context.getArgByIndex(1);

    const isAdmin = user.role === UserRole.Admin;
    const isSelfUpdate = String(user.id) === args.user.userId;

    if (isAdmin) {
      return true;
    }
    if (!isAdmin && isSelfUpdate && args.user.role === UserRole.Admin) {
      throw new ForbiddenException("You cannot assign the Admin role yourself");
    }
    if (isSelfUpdate) {
      return true;
    }
    return false;
  }
}
