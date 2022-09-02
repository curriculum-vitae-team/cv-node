import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/roles.decorator";
import { UserRoles } from "src/users/model/user.roles";
import { SkillsService } from "./skills.service";
import { SkillDto } from "./dto/skill.dto";

@Resolver()
export class SkillsResolver {
  constructor(private readonly skillsService: SkillsService) {}

  @Query("skills")
  skills() {
    return this.skillsService.findAll();
  }

  @Roles(UserRoles.Admin)
  @Mutation("createSkill")
  createSkill(@Args("skill") args: SkillDto) {
    return this.skillsService.create(args);
  }

  @Roles(UserRoles.Admin)
  @Mutation("updateSkill")
  updateSkill(@Args("id") id: string, @Args("skill") args: SkillDto) {
    return this.skillsService.update(id, args);
  }

  @Roles(UserRoles.Admin)
  @Mutation("deleteSkill")
  deleteSkill(@Args("id") id: string) {
    return this.skillsService.delete(id);
  }
}
