import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { PositionModel } from "./model/position.model";
import { PositionInput } from "src/graphql";

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(PositionModel)
    private readonly positionRepository: Repository<PositionModel>
  ) {}

  findAll() {
    return this.positionRepository.find();
  }

  findMany(ids: string[]) {
    return this.positionRepository.find({
      where: { id: In(ids) },
    });
  }

  findOneById(id: string) {
    return this.positionRepository.findOneOrFail({
      where: { id },
    });
  }

  create(variables: PositionInput) {
    const position = this.positionRepository.create(variables);
    return this.positionRepository.save(position);
  }

  async update(id: string, variables: PositionInput) {
    const position = await this.findOneById(id);
    Object.assign(position, variables);
    return this.positionRepository.save(position);
  }

  delete(id: string) {
    return this.positionRepository.delete(id);
  }
}
