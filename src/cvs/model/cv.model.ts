import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cv, LanguageProficiency, SkillMastery } from "src/graphql";
import { UserModel } from "src/users/model/user.model";
import { ProjectModel } from "src/projects/model/project.model";

@Entity("cv")
export class CvModel implements Cv {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => UserModel, (user) => user.cvs, { onDelete: "SET NULL" })
  user: UserModel;

  @ManyToMany(() => ProjectModel, { cascade: true })
  @JoinTable()
  projects: ProjectModel[];

  @Column("simple-json", { default: [] })
  skills: SkillMastery[];

  @Column("simple-json", { default: [] })
  languages: LanguageProficiency[];
}
