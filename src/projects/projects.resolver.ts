import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateProjectDto } from "./dto/create-project.dto";
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
  createProject(@Args("createProjectInput") args: CreateProjectDto) {
    return this.projectsService.create(args);
  }

  updateProject() {}

  @Mutation("deleteProject")
  deleteProject(@Args("id") id: string) {
    return this.projectsService.delete(id);
  }
}
