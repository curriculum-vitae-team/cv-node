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

  async create(variables: LanguageInput) {
    const language = this.languageRepository.create(variables);
    return await this.languageRepository.save(language);
  }

  delete(id: string) {
    return this.languageRepository.delete(id);
  }
}
