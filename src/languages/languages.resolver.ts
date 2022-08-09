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
  // @UseGuards(JwtGuard)
  createLanguage(@Args("language") args: LanguageDto) {
    return this.languagesService.create(args);
  }

  @Mutation("deleteLanguage")
  // @UseGuards(JwtGuard)
  deleteLanguage(@Args("id") id: string) {
    return this.languagesService.delete(id);
  }
}
