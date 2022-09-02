import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Expose } from "class-transformer";
import { LanguageProficiency, Profile, SkillMastery } from "src/graphql";
import { DepartmentModel } from "src/departments/model/department.model";
import { PositionModel } from "src/positions/model/position.model";

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

  @ManyToOne(() => DepartmentModel, { nullable: true, eager: true })
  @JoinColumn()
  department: DepartmentModel;

  @Expose()
  get department_name() {
    if (!this.department) {
      return null;
    }
    return this.department.name;
  }

  @ManyToOne(() => PositionModel, { nullable: true, eager: true })
  @JoinColumn()
  position: PositionModel;

  @Expose()
  get position_name() {
    if (!this.position) {
      return null;
    }
    return this.position.name;
  }

  @Column("simple-json", { default: [] })
  skills: SkillMastery[];

  @Column("simple-json", { default: [] })
  languages: LanguageProficiency[];
}
