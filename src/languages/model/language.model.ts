import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Language } from "src/graphql";

@Entity("language")
export class LanguageModel implements Language {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ unique: true })
  iso2: string;

  @Column({ unique: true })
  name: string;
}
