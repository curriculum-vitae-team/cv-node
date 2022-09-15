import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Expose } from "class-transformer";
import { LanguageProficiency, Profile, SkillMastery } from "src/graphql";

@Entity("profile")
export class ProfileModel implements Profile {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Expose()
  get full_name() {
    if (!this.first_name && !this.last_name) {
      return null;
    }
    return [this.first_name, this.last_name].join(" ").trim();
  }

  @Column({ nullable: true })
  avatar: string;

  @Column("simple-json", { default: [] })
  skills: SkillMastery[];

  @Column("simple-json", { default: [] })
  languages: LanguageProficiency[];
}
