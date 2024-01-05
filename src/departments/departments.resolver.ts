import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/roles.decorator";
import { UserRole } from "src/graphql";
import { DepartmentsService } from "./departments.service";
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
  DeleteDepartmentDto,
} from "./dto/department.dto";

@Resolver()
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Query("departments")
  departments() {
    return this.departmentsService.findAll();
  }

  @Roles(UserRole.Admin)
  @Mutation("createDepartment")
  createDepartment(@Args("department") args: CreateDepartmentDto) {
    return this.departmentsService.create(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("updateDepartment")
  updateDepartment(@Args("department") args: UpdateDepartmentDto) {
    return this.departmentsService.update(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("deleteDepartment")
  deleteDepartment(@Args("department") args: DeleteDepartmentDto) {
    return this.departmentsService.delete(args);
  }
}
