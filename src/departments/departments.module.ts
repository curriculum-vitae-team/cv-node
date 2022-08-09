import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentModel } from "./model/department.model";
import { DepartmentsResolver } from "./departments.resolver";
import { DepartmentsService } from "./departments.service";

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentModel])],
  providers: [DepartmentsResolver, DepartmentsService],
})
export class DepartmentsModule {}
