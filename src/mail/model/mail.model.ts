import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Mail } from "src/graphql";
import { Exclude } from "class-transformer";

@Entity("mail")
export class MailModel implements Mail {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  otp: string;
}
