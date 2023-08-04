import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { User } from "src/graphql";
import { CvModel } from "src/cvs/model/cv.model";
import { ProfileModel } from "src/profile/model/profile.model";
import { DepartmentModel } from "src/departments/model/department.model";
import { PositionModel } from "src/positions/model/position.model";
import { UserRole } from "src/graphql";

@Entity("user")
export class UserModel implements User {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ unique: true })
  email: string;

  @Column("boolean", { default: false })
  is_verified: boolean;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => ProfileModel, { cascade: true })
  @JoinColumn()
  profile: ProfileModel;

  @OneToMany(() => CvModel, (cv) => cv.user, { cascade: true })
  cvs: CvModel[];

  @ManyToOne(() => DepartmentModel, {
    nullable: true,
    eager: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  department: DepartmentModel;

  @Expose()
  get department_name() {
    if (!this.department) {
      return null;
    }
    return this.department.name;
  }

  @ManyToOne(() => PositionModel, {
    nullable: true,
    eager: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  position: PositionModel;

  @Expose()
  get position_name() {
    if (!this.position) {
      return null;
    }
    return this.position.name;
  }

  @Column("enum", { enum: UserRole, default: UserRole.Employee })
  role: UserRole;
}
