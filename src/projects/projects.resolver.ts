import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/roles.decorator";
import { UserRole } from "src/graphql";
import { ProjectDto } from "./dto/project.dto";
import { ProjectsService } from "./projects.service";

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query("projects")
  projects() {
    return this.projectsService.findAll();
  }

  @Query("project")
  project(@Args("id") id: string) {
    return this.projectsService.findOneById(id);
  }

  @Roles(UserRole.Admin)
  @Mutation("createProject")
  createProject(@Args("project") args: ProjectDto) {
    return this.projectsService.create(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("updateProject")
  updateProject(@Args("id") id: string, @Args("project") args: ProjectDto) {
    return this.projectsService.update(id, args);
  }

  @Roles(UserRole.Admin)
  @Mutation("deleteProject")
  deleteProject(@Args("id") id: string) {
    return this.projectsService.delete(id);
  }
}
