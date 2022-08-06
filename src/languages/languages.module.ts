import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LanguageModel } from "./model/language.model";
import { LanguagesResolver } from "./languages.resolver";
import { LanguagesService } from "./languages.service";

@Module({
  imports: [TypeOrmModule.forFeature([LanguageModel])],
  providers: [LanguagesResolver, LanguagesService],
})
export class LanguagesModule {}
