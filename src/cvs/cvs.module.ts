import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CvModel } from "./model/cv.model";
import { UsersModule } from "../users/users.module";
import { CvsResolver } from "./cvs.resolver";
import { CvsService } from "./cvs.service";

@Module({
  imports: [TypeOrmModule.forFeature([CvModel]), forwardRef(() => UsersModule)],
  providers: [CvsResolver, CvsService],
  exports: [CvsService],
})
export class CvsModule {}
