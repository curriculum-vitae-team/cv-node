import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetUserRole = createParamDecorator((_, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);

  return ctx.getContext().req.user.role;
});
