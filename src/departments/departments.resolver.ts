import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DepartmentsService } from "./departments.service";
import { DepartmentDto } from "./dto/department.dto";

@Resolver()
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Query("departments")
  departments() {
    return this.departmentsService.findAll();
  }

  @Mutation("createDepartment")
  createDepartment(@Args("department") args: DepartmentDto) {
    return this.departmentsService.create(args);
  }

  @Mutation("updateDepartment")
  updateDepartment(
    @Args("id") id: string,
    @Args("department") args: DepartmentDto
  ) {
    return this.departmentsService.update(id, args);
  }

  @Mutation("deleteDepartment")
  deleteDepartment(@Args("id") id: string) {
    return this.departmentsService.delete(id);
  }
}
