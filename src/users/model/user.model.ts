import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "src/graphql";
import { CvModel } from "src/cvs/model/cv.model";

@Entity("user")
export class UserModel implements User {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @OneToMany(() => CvModel, (cv) => cv.user, { cascade: true })
  cvs: CvModel[];
}
