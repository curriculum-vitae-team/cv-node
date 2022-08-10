import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Skill } from "src/graphql";

@Entity("skill")
export class SkillModel implements Skill {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ unique: true })
  name: string;
}
