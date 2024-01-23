import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Roles } from "src/app/guards/roles.decorator";
import { UserRole } from "src/graphql";
import { LanguagesService } from "./languages.service";
import { CreateLanguageDto, UpdateLanguageDto, DeleteLanguageDto } from "./dto/language.dto";

@Resolver()
export class LanguagesResolver {
  constructor(private readonly languagesService: LanguagesService) {}

  @Query("languages")
  languages() {
    return this.languagesService.findAll();
  }

  @Roles(UserRole.Admin)
  @Mutation("createLanguage")
  createLanguage(@Args("language") args: CreateLanguageDto) {
    return this.languagesService.createLanguage(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("updateLanguage")
  updateLanguage(@Args("language") args: UpdateLanguageDto) {
    return this.languagesService.updateLanguage(args);
  }

  @Roles(UserRole.Admin)
  @Mutation("deleteLanguage")
  deleteLanguage(@Args("language") args: DeleteLanguageDto) {
    return this.languagesService.deleteLanguage(args);
  }
}
