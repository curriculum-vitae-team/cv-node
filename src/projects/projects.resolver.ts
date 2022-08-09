import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
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

  @Mutation("createProject")
  createProject(@Args("project") args: ProjectDto) {
    return this.projectsService.create(args);
  }

  @Mutation("updateProject")
  updateProject(@Args("id") id: string, @Args("project") args: ProjectDto) {
    return this.projectsService.update(id, args);
  }

  @Mutation("deleteProject")
  deleteProject(@Args("id") id: string) {
    return this.projectsService.delete(id);
  }
}
