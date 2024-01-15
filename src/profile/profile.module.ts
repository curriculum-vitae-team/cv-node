import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudModule } from "src/cloud/cloud.module";
import { UsersModule } from "src/users/users.module";
import { ProfileModel } from "./model/profile.model";
import { ProfileResolver } from "./profile.resolver";
import { ProfileService } from "./profile.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileModel]), forwardRef(() => UsersModule), CloudModule],
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
