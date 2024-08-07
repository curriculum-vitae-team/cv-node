import { Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtPayload } from "src/auth/strategies/access_token.strategy";
import { CvsService } from "src/cvs/cvs.service";
import { UserRole } from "src/graphql";

@Injectable()
export class OwnCvGuard implements CanActivate {
  constructor(private readonly cvsService: CvsService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const jwt = req.user as JwtPayload;

    const isAdmin = jwt.role === UserRole.Admin;

    if (isAdmin) {
      return true;
    }

    const args = context.getArgByIndex(1);
    const cvId = args.cv?.cvId || args.skill?.cvId || args.project?.cvId;
    const cv = await this.cvsService.findOneById(cvId);
    const isOwnCv = jwt.sub === cv.user.id;

    if (isOwnCv) {
      return true;
    }

    return false;
  }
}
