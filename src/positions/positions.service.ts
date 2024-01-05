import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { PositionModel } from "./model/position.model";
import { CreatePositionInput, UpdatePositionInput, DeletePositionInput } from "src/graphql";

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
    if (!id) {
      return null;
    }
    return this.positionRepository.findOne({
      where: { id },
    });
  }

  create({ name }: CreatePositionInput) {
    const position = this.positionRepository.create({ name });
    return this.positionRepository.save(position);
  }

  async update({ positionId, name }: UpdatePositionInput) {
    const position = await this.findOneById(positionId);
    position.name = name;
    return this.positionRepository.save(position);
  }

  delete({ positionId }: DeletePositionInput) {
    return this.positionRepository.delete(positionId);
  }
}
