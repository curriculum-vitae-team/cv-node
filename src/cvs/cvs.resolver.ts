import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CvsService } from "./cvs.service";
import { CreateCvDto } from "./dto/create-cv.dto";

@Resolver()
export class CvsResolver {
  constructor(private readonly cvsService: CvsService) {}

  @Query("cvs")
  cvs() {
    return this.cvsService.findAll();
  }

  @Query("cv")
  cv(@Args("id") id: string) {
    return this.cvsService.findOneById(id);
  }

  @Mutation("createCv")
  createCv(@Args("createCvInput") args: CreateCvDto) {
    return this.cvsService.create(args);
  }

  @Mutation("updateCv")
  updateCv() {
    return;
  }

  @Mutation("deleteCv")
  deleteCv(@Args("id") id: string) {
    return this.cvsService.delete(id);
  }
}
