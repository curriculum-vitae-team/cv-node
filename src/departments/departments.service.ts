import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DepartmentModel } from "./model/department.model";
import { CreateDepartmentInput, DeleteDepartmentInput, UpdateDepartmentInput } from "src/graphql";

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
    if (!id) {
      return null;
    }
    return this.departmentRepository.findOne({
      where: { id },
    });
  }

  create({ name }: CreateDepartmentInput) {
    const department = this.departmentRepository.create({ name });
    return this.departmentRepository.save(department);
  }

  async update({ departmentId, name }: UpdateDepartmentInput) {
    const department = await this.findOneById(departmentId);
    department.name = name;
    return this.departmentRepository.save(department);
  }

  delete({ departmentId }: DeleteDepartmentInput) {
    return this.departmentRepository.delete(departmentId);
  }
}
