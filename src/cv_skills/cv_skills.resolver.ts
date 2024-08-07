import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AddCvSkillDto, UpdateCvSkillDto, DeleteCvSkillDto } from "../cv_skills/dto/cv_skill.dto";
import { UseGuards } from "@nestjs/common";
import { OwnCvGuard } from "src/app/guards/own_cv.guard";
import { CvSkillsService } from "./cv_skills.service";

@Resolver()
export class CvSkillsResolver {
  constructor(private readonly cvSkillsService: CvSkillsService) {}

  @UseGuards(OwnCvGuard)
  @Mutation("addCvSkill")
  addCvSkill(@Args("skill") args: AddCvSkillDto) {
    return this.cvSkillsService.addCvSkill(args);
  }

  @UseGuards(OwnCvGuard)
  @Mutation("updateCvSkill")
  updateCvSkill(@Args("skill") args: UpdateCvSkillDto) {
    return this.cvSkillsService.updateCvSkill(args);
  }

  @UseGuards(OwnCvGuard)
  @Mutation("deleteCvSkill")
  deleteCvSkill(@Args("skill") args: DeleteCvSkillDto) {
    return this.cvSkillsService.deleteCvSkill(args);
  }
}
