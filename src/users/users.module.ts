import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "./model/user.model";
import { CvsModule } from "../cvs/cvs.module";
import { ProfileModule } from "../profile/profile.module";
import { DepartmentsModule } from "src/departments/departments.module";
import { PositionsModule } from "src/positions/positions.module";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    forwardRef(() => CvsModule),
    ProfileModule,
    DepartmentsModule,
    PositionsModule,
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
