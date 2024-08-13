import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../graphql";

@Entity("project")
export class ProjectModel implements Project {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  created_at: string;

  @Column()
  name: string;

  @Column("varchar", { default: "" })
  internal_name: string;

  @Column("varchar", { default: "" })
  description: string;

  @Column()
  domain: string;

  @Column("date")
  start_date: string;

  @Column("date", { nullable: true })
  end_date?: string;

  @Column("simple-json", { default: [] })
  environment: string[];
}
