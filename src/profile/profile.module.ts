import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileModel } from "./model/profile.model";
import { DepartmentsModule } from "src/departments/departments.module";
import { PositionsModule } from "src/positions/positions.module";
import { ProfileService } from "./profile.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileModel]),
    DepartmentsModule,
    PositionsModule,
  ],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
