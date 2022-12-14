import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/roles.decorator";
import { UserRoles } from "src/users/model/user.roles";
import { LanguagesService } from "./languages.service";
import { LanguageDto } from "./dto/language.dto";

@Resolver()
export class LanguagesResolver {
  constructor(private readonly languagesService: LanguagesService) {}

  @Query("languages")
  languages() {
    return this.languagesService.findAll();
  }

  @Roles(UserRoles.Admin)
  @Mutation("createLanguage")
  createLanguage(@Args("language") args: LanguageDto) {
    return this.languagesService.create(args);
  }

  @Roles(UserRoles.Admin)
  @Mutation("updateLanguage")
  updateLanguage(@Args("id") id: string, @Args("language") args: LanguageDto) {
    return this.languagesService.update(id, args);
  }

  @Roles(UserRoles.Admin)
  @Mutation("deleteLanguage")
  deleteLanguage(@Args("id") id: string) {
    return this.languagesService.delete(id);
  }
}
