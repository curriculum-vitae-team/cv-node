import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { OwnCvGuard } from "src/app/guards/own_cv.guard";
import {
  AddCvProjectDto,
  RemoveCvProjectDto,
  UpdateCvProjectDto,
} from "../cv_projects/dto/cv_project.dto";
import { CvProjectsService } from "./cv_projects.service";

@Resolver()
export class CvProjectsResolver {
  constructor(private readonly cvProjectsService: CvProjectsService) {}

  @UseGuards(OwnCvGuard)
  @Mutation("addCvProject")
  addCvProject(@Args("project") args: AddCvProjectDto) {
    return this.cvProjectsService.addCvProject(args);
  }

  @UseGuards(OwnCvGuard)
  @Mutation("updateCvProject")
  updateCvProject(@Args("project") args: UpdateCvProjectDto) {
    return this.cvProjectsService.updateCvProject(args);
  }

  @UseGuards(OwnCvGuard)
  @Mutation("removeCvProject")
  removeCvProject(@Args("project") args: RemoveCvProjectDto) {
    return this.cvProjectsService.removeCvProject(args);
  }
}
