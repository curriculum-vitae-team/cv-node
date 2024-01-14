import { Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtResult } from "src/auth/guards/jwt.strategy";
import { CvsService } from "src/cvs/cvs.service";
import { UserRole } from "src/graphql";

@Injectable()
export class OwnCvGuard implements CanActivate {
  constructor(private readonly cvsService: CvsService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const jwt = req.user as JwtResult;

    const args = context.getArgByIndex(1);
    const cvId = args.cv?.cvId || args.skill?.cvId;

    const isAdmin = jwt.role === UserRole.Admin;
    const cv = await this.cvsService.findOneById(cvId);
    const isOwnCv = jwt.userId === cv.user.id;

    if (isAdmin) {
      return true;
    }
    if (isOwnCv) {
      return true;
    }
    return false;
  }
}
