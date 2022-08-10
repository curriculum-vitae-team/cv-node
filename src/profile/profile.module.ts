import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentsModule } from "src/departments/departments.module";
import { ProfileModel } from "./model/profile.model";
import { ProfileService } from "./profile.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileModel]), DepartmentsModule],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
