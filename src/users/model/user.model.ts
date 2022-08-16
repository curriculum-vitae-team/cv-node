import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { User } from "src/graphql";
import { CvModel } from "src/cvs/model/cv.model";
import { ProfileModel } from "src/profile/model/profile.model";

@Entity("user")
export class UserModel implements User {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => ProfileModel, { cascade: true })
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => CvModel, (cv) => cv.user, { cascade: true })
  cvs: CvModel[];
}
