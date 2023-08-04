import { SetMetadata } from "@nestjs/common";
import { UserRoles } from "src/graphql";

export const Roles = (...roles: UserRoles[]) => SetMetadata("roles", roles);
