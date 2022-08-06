import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cv, LanguageProficiency } from "src/graphql";
import { UserModel } from "src/users/model/user.model";

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

  // @Column()
  projects: [];

  @Column("json", { array: true, default: [] })
  languages: LanguageProficiency[];

  // @Column()
  skills: [];

  @ManyToOne(() => UserModel, (user) => user.cvs, { onDelete: "CASCADE" })
  user: UserModel;
}
