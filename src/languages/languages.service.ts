import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LanguageModel } from "./model/language.model";
import { LanguageInput } from "src/graphql";

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

  create(variables: LanguageInput) {
    const language = this.languageRepository.create(variables);
    return this.languageRepository.save(language);
  }

  async update(id: string, variables: LanguageInput) {
    const language = await this.findOneById(id);
    Object.assign(language, variables);
    return this.languageRepository.save(language);
  }

  delete(id: string) {
    return this.languageRepository.delete(id);
  }
}
