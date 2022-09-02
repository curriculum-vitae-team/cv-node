import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PositionModel } from "./model/position.model";
import { PositionsResolver } from "./positions.resolver";
import { PositionsService } from "./positions.service";

@Module({
  imports: [TypeOrmModule.forFeature([PositionModel])],
  providers: [PositionsResolver, PositionsService],
  exports: [PositionsService],
})
export class PositionsModule {}
