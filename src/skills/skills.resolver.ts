import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/guards/roles.decorator";
import { UserRole } from "src/graphql";
import { SkillsService } from "./skills.service";
import { CreateSkillDto, UpdateSkillDto, DeleteSkillDto } from "./dto/skill.dto";

@Resolver()
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Query("skills")
  skills() {
    return this.skillsService.findAll();
  }

  @Roles(UserRole.Admin)
  @Mutation("createSkill")
  createSkill(@Args("skill") args: CreateSkillDto) {
    return this.skillsService.createSkill(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("updateSkill")
  updateSkill(@Args("skill") args: UpdateSkillDto) {
    return this.skillsService.updateSkill(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("deleteSkill")
  deleteSkill(@Args("skill") args: DeleteSkillDto) {
    return this.skillsService.deleteSkill(args);
  }
}
