import { DepartmentModel } from "src/departments/model/department.model";
import { Profile } from "src/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @ManyToOne(() => DepartmentModel, { nullable: true, eager: true })
  @JoinColumn()
  department: DepartmentModel;

  @Column({ nullable: true })
  specialization: string;

  @Column("json", { array: true, default: [] })
  skills: string[];

  @Column("json", { array: true, default: [] })
  languages: string[];
}
