import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/guards/roles.decorator";
import { UserRole } from "src/graphql";
import { CreateProjectDto, UpdateProjectDto, DeleteProjectDto } from "./dto/project.dto";
import { ProjectsService } from "./projects.service";

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query("projects")
  projects() {
    return this.projectsService.findAll();
  }

  @Query("project")
  project(@Args("projectId") projectId: string) {
    return this.projectsService.findOneById(projectId);
  }

  @Roles(UserRole.Admin)
  @Mutation("createProject")
  createProject(@Args("project") args: CreateProjectDto) {
    return this.projectsService.createProject(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("updateProject")
  updateProject(@Args("project") args: UpdateProjectDto) {
    return this.projectsService.updateProject(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("deleteProject")
  deleteProject(@Args("project") args: DeleteProjectDto) {
    return this.projectsService.deleteProject(args);
  }
}
