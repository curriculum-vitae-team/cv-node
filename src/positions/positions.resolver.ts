import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/roles.decorator";
import { UserRole } from "src/graphql";
import { PositionsService } from "./positions.service";
import { CreatePositionDto, UpdatePositionDto, DeletePositionDto } from "./dto/position.dto";

@Resolver()
export class PositionsResolver {
  constructor(private readonly positionsService: PositionsService) {}

  @Query("positions")
  positions() {
    return this.positionsService.findAll();
  }

  @Roles(UserRole.Admin)
  @Mutation("createPosition")
  createPosition(@Args("position") args: CreatePositionDto) {
    return this.positionsService.create(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("updatePosition")
  updatePosition(@Args("position") args: UpdatePositionDto) {
    return this.positionsService.update(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("deletePosition")
  deletePosition(@Args("position") args: DeletePositionDto) {
    return this.positionsService.delete(args);
  }
}
