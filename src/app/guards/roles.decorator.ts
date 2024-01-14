import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/graphql";

export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles);
