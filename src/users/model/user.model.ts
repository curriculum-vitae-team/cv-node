import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "src/graphql";

@Entity("user")
export class UserModel implements User {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;
}
