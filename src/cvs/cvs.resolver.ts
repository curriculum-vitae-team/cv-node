import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CvsService } from "./cvs.service";
import { CvDto } from "./dto/cv.dto";

@Resolver()
export class CvsResolver {
  constructor(private readonly cvsService: CvsService) {}

  @Query("cvs")
  cvs() {
    return this.cvsService.findAll();
  }

  @Query("cv")
  cv(@Args("id") id: string) {
    return this.cvsService.findOneByIdAndJoinProfile(id);
  }

  @Mutation("createCv")
  createCv(@Args("cv") args: CvDto) {
    return this.cvsService.create(args);
  }

  // TODO: user can update only his own cvs
  // admin can update any
  @Mutation("updateCv")
  updateCv(@Args("id") id: string, @Args("cv") args: CvDto) {
    return this.cvsService.update(id, args);
  }

  // TODO: user can delete only his own cvs
  // admin can delete any
  @Mutation("deleteCv")
  deleteCv(@Args("id") id: string) {
    return this.cvsService.delete(id);
  }

  @Mutation("unbindCv")
  unbindCv(@Args("id") id: string) {
    return this.cvsService.unbind(id);
  }
}
