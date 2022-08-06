import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LanguageModel } from "./model/language.model";
import { CreateLanguageInput } from "src/graphql";

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(LanguageModel)
    private readonly languageRepository: Repository<LanguageModel>
  ) {}

  async create(createLanguageInput: CreateLanguageInput) {
    const language = this.languageRepository.create(createLanguageInput);
    return await this.languageRepository.save(language);
  }

  delete(id: string) {
    return this.languageRepository.delete(id);
  }

  findAll() {
    return this.languageRepository.find();
  }
}
