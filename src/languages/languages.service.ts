import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LanguageModel } from "./model/language.model";
import { CreateLanguageInput, DeleteLanguageInput, UpdateLanguageInput } from "src/graphql";

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguageModel)
    private readonly languageRepository: Repository<LanguageModel>
  ) {}

  findAll() {
    return this.languageRepository.find();
  }

  findOneById(id: string) {
    return this.languageRepository.findOne({
      where: { id },
    });
  }

  createLanguage({ name, iso2, native_name }: CreateLanguageInput) {
    const language = this.languageRepository.create({
      name,
      iso2,
      native_name,
    });
    return this.languageRepository.save(language);
  }

  async updateLanguage({ languageId, name, iso2, native_name }: UpdateLanguageInput) {
    const language = await this.findOneById(languageId);
    language.name = name;
    language.iso2 = iso2;
    language.native_name = native_name;
    return this.languageRepository.save(language);
  }

  deleteLanguage({ languageId }: DeleteLanguageInput) {
    return this.languageRepository.delete(languageId);
  }
}
