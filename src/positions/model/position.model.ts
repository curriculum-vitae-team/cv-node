import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Position } from "src/graphql";

@Entity("position")
export class PositionModel implements Position {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ unique: true })
  name: string;
}
