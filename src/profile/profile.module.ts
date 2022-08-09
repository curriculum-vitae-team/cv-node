import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileModel } from "./model/profile.model";
import { ProfileService } from "./profile.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileModel])],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
