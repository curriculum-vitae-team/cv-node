import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetOrigin = createParamDecorator((_, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);

  return ctx.getContext().req.headers.origin;
});
