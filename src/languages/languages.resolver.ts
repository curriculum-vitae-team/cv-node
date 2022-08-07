import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtGuard } from "src/auth/jwt.guard";
import { LanguagesService } from "./languages.service";
import { CreateLanguageDto } from "./dto/create-language.dto";

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
  createLanguage(@Args("createLanguageInput") args: CreateLanguageDto) {
    return this.languagesService.create(args);
  }

  @Mutation("deleteLanguage")
  // @UseGuards(JwtGuard)
  deleteLanguage(@Args("id") id: string) {
    return this.languagesService.delete(id);
  }
}
