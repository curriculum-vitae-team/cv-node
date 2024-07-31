import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetToken = createParamDecorator((_, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const header = ctx.getContext().req.headers.authorization;
  const token = header?.replace("Bearer ", "");

  return token || "";
});
