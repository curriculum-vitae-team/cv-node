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
import { CvProjectModel } from "src/cv_projects/model/cv_project.model";

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

  @Column({ nullable: true })
  education: string;

  @Column()
  description: string;

  @ManyToOne(() => UserModel, (user) => user.cvs, { onDelete: "SET NULL" })
  user: UserModel;

  @ManyToMany(() => CvProjectModel, { cascade: true })
  @JoinTable()
  projects: CvProjectModel[];

  @Column("simple-json", { default: [] })
  skills: SkillMastery[];

  @Column("simple-json", { default: [] })
  languages: LanguageProficiency[];
}
