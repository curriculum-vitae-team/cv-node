import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SkillModel } from "src/skills/model/skill.model";
import { Project } from "../../graphql";

@Entity("project")
export class ProjectModel implements Project {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  internal_name?: string;

  @Column()
  description: string;

  @Column()
  domain: string;

  @Column("date")
  start_date: string;

  @Column("date", { nullable: true })
  end_date?: string;

  @Column("int", { default: 1 })
  team_size: number;

  @ManyToMany(() => SkillModel)
  @JoinTable()
  tech_stack: SkillModel[];
}
