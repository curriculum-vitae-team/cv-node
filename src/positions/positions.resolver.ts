import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/roles.decorator";
import { UserRoles } from "src/graphql";
import { PositionsService } from "./positions.service";
import { PositionDto } from "./dto/position.dto";

@Resolver()
export class PositionsResolver {
  constructor(private readonly positionsService: PositionsService) {}

  @Query("positions")
  positions() {
    return this.positionsService.findAll();
  }

  @Roles(UserRoles.Admin)
  @Mutation("createPosition")
  createPosition(@Args("position") args: PositionDto) {
    return this.positionsService.create(args);
  }

  @Roles(UserRoles.Admin)
  @Mutation("updatePosition")
  updatePosition(@Args("id") id: string, @Args("position") args: PositionDto) {
    return this.positionsService.update(id, args);
  }

  @Roles(UserRoles.Admin)
  @Mutation("deletePosition")
  deletePosition(@Args("id") id: string) {
    return this.positionsService.delete(id);
  }
}
