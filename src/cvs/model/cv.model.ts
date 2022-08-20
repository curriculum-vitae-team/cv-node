import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cv, LanguageProficiency } from "src/graphql";
import { UserModel } from "src/users/model/user.model";
import { ProjectModel } from "src/projects/model/project.model";

@Entity("cv")
export class CvModel implements Cv {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => UserModel, (user) => user.cvs, { onDelete: "SET NULL" })
  user: UserModel;

  @ManyToMany(() => ProjectModel, { cascade: true })
  @JoinTable()
  projects: ProjectModel[];

  @Column("jsonb", { default: [] })
  languages: LanguageProficiency[];
}
