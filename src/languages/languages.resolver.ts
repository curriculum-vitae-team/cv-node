import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtGuard } from "src/auth/jwt.guard";
import { LanguagesService } from "./languages.service";
import { LanguageDto } from "./dto/language.dto";

@Resolver()
export class LanguagesResolver {
  constructor(private readonly languagesService: LanguagesService) {}

  @Query("languages")
  // @UseGuards(JwtGuard)
  languages() {
    return this.languagesService.findAll();
  }

  @Mutation("createLanguage")
  createLanguage(@Args("language") args: LanguageDto) {
    return this.languagesService.create(args);
  }

  @Mutation("updateLanguage")
  updateLanguage(@Args("id") id: string, @Args("language") args: LanguageDto) {
    return this.languagesService.update(id, args);
  }

  @Mutation("deleteLanguage")
  deleteLanguage(@Args("id") id: string) {
    return this.languagesService.delete(id);
  }
}
