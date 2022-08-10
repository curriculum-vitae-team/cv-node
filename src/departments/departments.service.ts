import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DepartmentModel } from "./model/department.model";
import { DepartmentInput } from "src/graphql";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentModel)
    private readonly departmentRepository: Repository<DepartmentModel>
  ) {}

  findAll() {
    return this.departmentRepository.find();
  }

  findOneById(id: string) {
    return this.departmentRepository.findOneOrFail({
      where: { id },
    });
  }

  create(variables: DepartmentInput) {
    const department = this.departmentRepository.create(variables);
    return this.departmentRepository.save(department);
  }

  async update(id: string, variables: DepartmentInput) {
    const department = await this.findOneById(id);
    Object.assign(department, variables);
    return this.departmentRepository.save(department);
  }

  delete(id: string) {
    return this.departmentRepository.delete(id);
  }
}
